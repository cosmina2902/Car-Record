package recea.licenta.evidentacheltuielmasini.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import recea.licenta.evidentacheltuielmasini.enitity.Cheltuieli;
import recea.licenta.evidentacheltuielmasini.enitity.FileUpload;

import java.util.List;

public interface FileUploadRepository extends JpaRepository<FileUpload, Long> {

    List<FileUpload> findByCheltuieli(Cheltuieli cheltuieli);
}
