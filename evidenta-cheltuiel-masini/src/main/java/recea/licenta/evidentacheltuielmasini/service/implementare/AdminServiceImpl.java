package recea.licenta.evidentacheltuielmasini.service.implementare;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import recea.licenta.evidentacheltuielmasini.dto.MasinaDto;
import recea.licenta.evidentacheltuielmasini.dto.TaxeDto;
import recea.licenta.evidentacheltuielmasini.enitity.Taxe;
import recea.licenta.evidentacheltuielmasini.repository.MasinaRepository;
import recea.licenta.evidentacheltuielmasini.repository.TaxaRepository;
import recea.licenta.evidentacheltuielmasini.repository.UserRepository;
import recea.licenta.evidentacheltuielmasini.service.AdminService;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AdminServiceImpl implements AdminService {

    private UserRepository userRepository;

    private MasinaRepository masinaRepository;

    private TaxaRepository taxaRepository;

    private ModelMapper modelMapper;
    @Override
    public Long getUserLoggati() {
        Long users = userRepository.findAll().stream().count();

        return users;
    }

    @Override
    public Long getMasiniInregistrate() {
        Long masini = masinaRepository.findAll().stream().count();

        return masini;
    }

    @Override
    public Long getCheltuieli() {
        Long cheltuieli = taxaRepository.findAll().stream().count();

        return cheltuieli;
    }

    @Override
    public Set<String> getMarci() {
        Set<String> marci = masinaRepository.findAllMarcas();

        return marci;
    }

    @Override
    public List<TaxeDto> getTaxeByMarca(String marca) {
        List<Taxe> taxebyMarca = taxaRepository.findByMarca(marca);

        return  taxebyMarca.stream().map(taxe -> modelMapper.map(taxe, TaxeDto.class)).collect(Collectors.toList());
    }

    @Override
    public Long getSumaTaxeByMarca(String marca) {
        List<Taxe> taxebyMarca = taxaRepository.findByMarca(marca);

        Long sumaTotala = 0L;

        for (Taxe taxa : taxebyMarca){
            sumaTotala += taxa.getSuma();
        }

        return sumaTotala;
    }
}
