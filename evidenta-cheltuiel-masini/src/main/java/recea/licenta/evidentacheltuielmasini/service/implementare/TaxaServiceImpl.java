package recea.licenta.evidentacheltuielmasini.service.implementare;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import recea.licenta.evidentacheltuielmasini.dto.TaxeDto;
import recea.licenta.evidentacheltuielmasini.enitity.CategorieCheltuieli;
import recea.licenta.evidentacheltuielmasini.enitity.Cheltuieli;
import recea.licenta.evidentacheltuielmasini.enitity.Masina;
import recea.licenta.evidentacheltuielmasini.enitity.Taxe;
import recea.licenta.evidentacheltuielmasini.exception.ResourceNotFound;
import recea.licenta.evidentacheltuielmasini.repository.CategorieCheltuieliRepository;
import recea.licenta.evidentacheltuielmasini.repository.CheltuieliRepository;
import recea.licenta.evidentacheltuielmasini.repository.MasinaRepository;
import recea.licenta.evidentacheltuielmasini.repository.TaxaRepository;
import recea.licenta.evidentacheltuielmasini.service.TaxaService;

import java.time.LocalDate;
import java.time.Month;
import java.time.Year;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TaxaServiceImpl implements TaxaService {
    private TaxaRepository taxaRepository;
    private ModelMapper modelMapper;

    private CheltuieliRepository cheltuieliRepository;

    private MasinaRepository masinaRepository;

    private CategorieCheltuieliRepository categorieCheltuieliRepository;
    @Transactional
    @Override
    public TaxeDto adaugareTaxa(TaxeDto taxeDto) {
        Taxe taxa = modelMapper.map(taxeDto, Taxe.class);

        Taxe salvareTaxa = taxaRepository.save(taxa);

        Masina masina = masinaRepository.findByNumarInmatriculare(taxa.getNumarInmatriculare());

        Cheltuieli cheltuieli = new Cheltuieli();
        cheltuieli.setMasina(masina);
        cheltuieli.setCategorieCheltuieli(salvareTaxa.getCategorieCheltuieli());


        cheltuieliRepository.save(cheltuieli);

        TaxeDto salvareTaxaDto = modelMapper.map(salvareTaxa, TaxeDto.class);

        return salvareTaxaDto;
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
    public TaxeDto updateTaxa(Long id, TaxeDto taxeDto) {
        Taxe taxe = taxaRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFound("Taxa cu id-ul "+ id + " nu a fost gsita"));
        taxe.setData(taxeDto.getData());
        taxe.setDataExpirare(taxeDto.getDataExpirare());
        taxe.setImagini(taxeDto.getImagini());
        taxe.setSuma(taxeDto.getSuma());
        taxe.setTip(taxeDto.getTip());
        taxe.setNumarInmatriculare(taxeDto.getNumarInmatriculare());

        CategorieCheltuieli categorieCheltuieli = categorieCheltuieliRepository.findById(taxeDto.getIdCategorieCheltuieli())
                .orElseThrow(() -> new ResourceNotFound("Categoria de cheltuieli cu id-ul " + taxeDto.getIdCategorieCheltuieli() + " nu a fost gsita"));

        taxe.setCategorieCheltuieli(categorieCheltuieli);

        Taxe modificareTaxa = taxaRepository.save(taxe);
        return modelMapper.map(modificareTaxa, TaxeDto.class);

    }

    @Override
    public String stergereTaxa(Long id) {
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


}
