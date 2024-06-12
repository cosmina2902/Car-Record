package recea.licenta.evidentacheltuielmasini.service.implementare;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import recea.licenta.evidentacheltuielmasini.dto.FileUploadDto;
import recea.licenta.evidentacheltuielmasini.dto.TaxeDto;
import recea.licenta.evidentacheltuielmasini.enitity.*;
import recea.licenta.evidentacheltuielmasini.exception.ResourceNotFound;
import recea.licenta.evidentacheltuielmasini.repository.*;
import recea.licenta.evidentacheltuielmasini.service.FileUploadService;
import recea.licenta.evidentacheltuielmasini.service.TaxaService;

import java.io.IOException;
import java.time.LocalDate;
import java.time.Month;
import java.time.Year;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TaxaServiceImpl implements TaxaService {
    private TaxaRepository taxaRepository;
    private ModelMapper modelMapper;

    private CheltuieliRepository cheltuieliRepository;

    private MasinaRepository masinaRepository;

    private FileUploadService fileUploadService;

    private FileUploadRepository fileUploadRepository;

    private CategorieCheltuieliRepository categorieCheltuieliRepository;
    @Transactional
    @Override
    public TaxeDto adaugareTaxa(TaxeDto taxeDto, MultipartFile[] files) throws IOException {
        Taxe taxa = modelMapper.map(taxeDto, Taxe.class);
        Taxe salvareTaxa = taxaRepository.save(taxa);

        Masina masina = masinaRepository.findByNumarInmatriculare(taxeDto.getNumarInmatriculare());

        Cheltuieli cheltuieli = new Cheltuieli();
        cheltuieli.setMasina(masina);
        cheltuieli.setCategorieCheltuieli(salvareTaxa.getCategorieCheltuieli());
        cheltuieliRepository.save(cheltuieli);

        if (files != null) {
            for (MultipartFile file : files) {
                if (!file.isEmpty()) {
                    fileUploadService.adaugareFisiere(file, cheltuieli);
                }
            }
        }

        return modelMapper.map(salvareTaxa, TaxeDto.class);
    }

    @Override
    public List<TaxeDto> getTaxe() {
        List<Taxe> taxe = taxaRepository.findAll();

        return taxe.stream().map(taxeDto -> modelMapper.map(taxeDto, TaxeDto.class)).collect(Collectors.toList());
    }

    @Override
    public TaxeDto getTaxaDupaId(Long id) {
        Taxe taxe = taxaRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFound("Taxa cu id-ul "+ id + " nu a fost gsita"));
        return modelMapper.map(taxe, TaxeDto.class);

    }
    @Override
    public List<FileUploadDto> getFileUploadByIdCheltuieli(Long id) {
        Cheltuieli cheltuieli = cheltuieliRepository.findById(id-7)
                .orElseThrow(() -> new ResourceNotFound("Cheltuiala cu id-ul " + id + " nu a fost gasita"));
        List<FileUpload> existingFiles = fileUploadRepository.findByCheltuieli(cheltuieli);

        return existingFiles.stream().map(fileUpload -> modelMapper.map(fileUpload, FileUploadDto.class)).collect(Collectors.toList());

    }

    @Transactional
    @Override
    public TaxeDto updateTaxa(Long id, TaxeDto taxeDto, MultipartFile[] files, boolean updateFiles) throws IOException {
        Taxe taxe = taxaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Taxa cu id-ul " + id + " nu a fost gasita"));

        taxe.setData(taxeDto.getData());
        taxe.setDataExpirare(taxeDto.getDataExpirare());
        taxe.setImagini(taxeDto.getImagini());
        taxe.setSuma(taxeDto.getSuma());
        taxe.setTip(taxeDto.getTip());
        taxe.setNumarInmatriculare(taxeDto.getNumarInmatriculare());

        CategorieCheltuieli categorieCheltuieli = categorieCheltuieliRepository.findById(taxeDto.getIdCategorieCheltuieli())
                .orElseThrow(() -> new ResourceNotFound("Categoria de cheltuieli cu id-ul " + taxeDto.getIdCategorieCheltuieli() + " nu a fost gasita"));

        taxe.setCategorieCheltuieli(categorieCheltuieli);

        Taxe modificareTaxa = taxaRepository.save(taxe);

        Cheltuieli cheltuieli = cheltuieliRepository.findById(id-7)
                .orElseThrow(() -> new ResourceNotFound("Cheltuiala cu id-ul " + id + " nu a fost gasita"));

        if (updateFiles) {
            // Șterge fișierele vechi asociate cu cheltuiala
            List<FileUpload> existingFiles = fileUploadRepository.findByCheltuieli(cheltuieli);
            for (FileUpload file : existingFiles) {
                fileUploadService.deleteFile(file.getId());
            }

            if (files != null && files.length > 0) {
                for (MultipartFile file : files) {
                    if (!file.isEmpty()) {
                        fileUploadService.adaugareFisiere(file, cheltuieli);
                    }
                }
            }
        }

        return modelMapper.map(modificareTaxa, TaxeDto.class);
    }


    @Override
    public String stergereTaxa(Long id) {
        Cheltuieli cheltuieli = cheltuieliRepository.findById(id-7)
                .orElseThrow(() -> new ResourceNotFound("Cheltuiala cu id-ul " + id + " nu a fost gasita"));
        List<FileUpload> existingFiles = fileUploadRepository.findByCheltuieli(cheltuieli);
        existingFiles.forEach(fileUpload -> {
            try {
                fileUploadService.deleteFile(fileUpload.getId());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });

        Taxe taxe = taxaRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFound("Taxa cu id-ul "+ id + " nu a fost gsita"));
        taxaRepository.delete(taxe);


        String message = "Taxa cu id-ul " + id + " a fost stearsa cu succes";

        return message;
    }
    @Override
    public List<TaxeDto> getTaxeByNumarInmatriculare(String numarInmatriculare) {
        List<Taxe> taxeList = taxaRepository.findByNumarInmatriculare(numarInmatriculare);
        return taxeList.stream()
                .map(taxe -> modelMapper.map(taxe, TaxeDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<TaxeDto> getCheltuieliPentruMasinaInLuna(String numarInmatriculare, int an, Month luna) {
        List<Taxe> taxeList = taxaRepository.findByNumarInmatriculareAndDataBetween(numarInmatriculare,
                LocalDate.of(an, luna, 1),
                LocalDate.of(an, luna, luna.length(Year.isLeap(an)))
        );

        return taxeList.stream()
                .map(taxe -> modelMapper.map(taxe, TaxeDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<TaxeDto> getByNumarInmatriculareAndAn(String numarInmatriculare, int an) {
        List<Taxe> taxeList = taxaRepository.findByNumarInmatriculare(numarInmatriculare);

        List<Taxe> taxeAn = taxeList.stream()
                .filter(taxe -> taxe.getData().getYear() == an)
                .collect(Collectors.toList());

        return taxeAn.stream()
                .map(taxe -> modelMapper.map(taxe, TaxeDto.class))
                .collect(Collectors.toList());

    }

    @Override
    public List<TaxeDto> getCheltuieliPentruMasinaInPerioada(String numarInmatriculare, LocalDate startDate, LocalDate endDate) {
        List<Taxe> taxeList = taxaRepository.findByNumarInmatriculare(numarInmatriculare);

        List<Taxe> taxeInPerioada = taxeList.stream()
                .filter(taxe -> !taxe.getData().isBefore(startDate) && !taxe.getData().isAfter(endDate))
                .collect(Collectors.toList());

        return taxeInPerioada.stream()
                .map(taxe -> modelMapper.map(taxe, TaxeDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public Integer getToateCheltuieleMasina(String numarInmatriculare) {
        List<Taxe> taxeList = taxaRepository.findByNumarInmatriculare(numarInmatriculare);

        int sumaTotala = 0;
        for (Taxe taxa: taxeList){
            sumaTotala += taxa.getSuma();
        }

        return sumaTotala;

    }

    @Override
    public List<Taxe> getTaxeByCategorieId(Long categorieId, String numarInmatricuare) {
        return taxaRepository.findByCategorieCheltuieliIdAndNumarInmatriculare(categorieId, numarInmatricuare);
    }

    @Override
    public List<Taxe> getTaxeExpirate(String numarInmatriculare, LocalDate dataExpirare) {
        return taxaRepository.findByNumarInmatriculareAndDataExpirareBefore(numarInmatriculare, dataExpirare);
    }

    @Override
    public List<TaxeDto> getTaxeByUserId(Long userId) {
        List<Masina> masini = masinaRepository.findAllByUserId(userId);
        List<TaxeDto> taxeFiltrate = new ArrayList<>();
        for (Masina masina : masini) {
            List<Taxe> taxe = taxaRepository.findByNumarInmatriculare(masina.getNumarInmatriculare());
            taxeFiltrate.addAll(taxe.stream().map(t -> modelMapper.map(t, TaxeDto.class)).collect(Collectors.toList()));
        }
        return taxeFiltrate;
    }

    @Override
    public List<Taxe> findTaxesThatWillExpireSoon(int daysInAdvance) {
        LocalDate today = LocalDate.now();
        LocalDate notificationDate = today.plusDays(daysInAdvance);
        return taxaRepository.findByDataExpirareBetween(today, notificationDate);
    }




}
