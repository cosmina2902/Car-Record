# [Car-Record](https://github.com/cosmina2902/Record-Car-Expenses-) 
Aplicație web pentru administrarea costurilor de întreținere a mașinilor 

 <h1 align="center">Cum sa rulezi Car Record</h2


 <!-- TABLE OF CONTENTS -->
<details>
  <summary>Cuprins</summary>
  <ol>
    <li>
      <a href="#despre-proiect">Despre proiect</a>
      <ul>
        <li><a href="#tehnologi-utilizate">Tehnologi utilizate</a></li>
      </ul>
    </li>
    <li>
      <a href="#instalare">Tehnologi de instalat</a>
    </li>
    <li><a href="#backend">Backend</a></li>
    <li><a href="#frontend">Frontend</a></li>
    <li><a href="#frontend">Frontend</a></li>
    <li><a href="#linkuri-utile">Linkuri Utile</a></li>
  </ol>
</details>

## Despre proiect
Scopul proiectului este de a ajuta posesorii de mașini în gestionarea cheltuielilor legate de mașina condusă într-o aplicație user friendly, care dispune de numeroase funcționalități utile pentru administrarea bugetului destinat automobilului. Posibilitatea de a ține toate costurile într-o singură aplicație poate venii în ajutorul utilizatorului în momentul în care dorește să își vândă autovehiculul deoarece îi poate arăta potențialului cumpărător dovezi, date exacte de întreținere, câștigând în acest fel credibilitate și seriozitate 

![image](https://github.com/cosmina2902/Record-Car-Expenses-/assets/120328847/ebd90bc3-b8a6-4810-8191-1f39f5cbcd45)

În acest proiect vom regăsi următoarele funcționalități:

*	Posibilitatea de a înregistra una sau mai multe mașini in baza de date
*	Posibilitatea de a adăuga cheltuieli asociate pe categoriile din care fac parte
* Memento-uri trimise cu 7 zile înainte de expirarea unei cheltuieli importante
*	Posibilitatea de a genera aceste grafice sub formă de pdf sau csv. 
*	Posibilitatea de a vedea amănunțit sub forma de grafice evidența sumelor plătite
*	Posibilitatea de a încarcă fișiere specifice cheltuielii adăugate
*	Posibilitatea de a descărca un .zip cu toate documentele atașate cheltuielii
*	Posibilitatea de a vizualiza benzinarii din orașul tău

## Tehnologi utilizate
Proiectul este de tip Full-Stack dezvoltat cu urmatoarele tehnologii:

* Spring Boot
* React.js
* MySql

## Instalare

Pentru a putea rula acest proiect este nevoie de urmatoarele tehnologii instalate
* Intellij Community Edition sau Eclipse
* Visual Studio Code 2022
* MySql 8.0

_Vom discuta separat atat pentru partea de backend cat si pentru partea de frontend rularea de success a proiectului si pregatirea mediului de lucru._

 Copiem (clonam) repository-ul local 
   ```sh
   git clone https://github.com/cosmina2902/Record-Car-Expenses-.git
   ```
## Backend

Rularea unui proiect spring boot nu necesita comenzi speciale, insa necesita modificari de cod si crearea de mediu de lucru corespunzator. 

1. Pregatirea bazei de date **MySql**
    * Instalare MySql de pe site-ul lor offical [MySql download](https://www.mysql.com/downloads/)
    * Deschidere MySql Shell si ruleaza comanda
        ```sh
         CREATE DATABASE car_mng;
         ```
2. Deschide IntelliJ si incarca partea de backend a proiectului **File->Open->Record-Car-Expenses-\evidenta-cheltuiel-masini**
3. In pom.xml descarca toate dependentele **Maven**
4. Configureaza application.properties pentru a lega proiectul de baza de date **MySql**
   
   ![image](https://github.com/cosmina2902/Record-Car-Expenses-/assets/120328847/9f79d793-576e-4b4a-baa5-6ac8e8c235d3)
5. Obtine o parola de aplicatie pentru trimiterea de email-uri
   * Din contul tau de google navigheaza _Gestioneaza-ti Contul Google->Securitate->2 Step Verification->App passwords_
   * Adauga un nume de aplicatie ex: **Car Record**
   * Apasa butonul **Create si copiaza parola obinuta**
   * Pentru mai multe detalii [Vizioneaza acest clip](https://www.youtube.com/watch?v=74QQfPrk4vE)
6. Configureaza application.properties pentru a permite trimiterea de email-uri din aplicatie
   
   ![image](https://github.com/cosmina2902/Record-Car-Expenses-/assets/120328847/29ed530f-ff9f-4b14-b6d2-6d63e0435c0b)
7. Navigheaza in clasa _EvidentaCheltuielMasiniApplication_ si apasa butonul de run
   
   ![image](https://github.com/cosmina2902/Record-Car-Expenses-/assets/120328847/9c196d33-dc6b-431f-8878-dc8d134fed9e)

   Aplicatia ta Spring Boot ar trebui sa porneasca cu succes
   ![image](https://github.com/cosmina2902/Record-Car-Expenses-/assets/120328847/c5c68626-10d1-4eec-8630-4e44fadbc2df)

## Frontend

Pentru a rula partea de frontend a acestui proiect trebuie urmati urmatorii pasi:

1. Deschide Visual Studio Code si incarca partea de frontend a proiectului **File->Open Folder->Record-Car-Expenses\Frontend**
2. Navigheaza catre directorul sursei proiectului
    ```sh
        cd Record_Car_Frontend
    ```
3. Instaleaza toate dependențele din fisierul package.json
    ```sh
        npm install
    ```
4. Ruleaza aplicatia React.js
    ```sh
        npm run dev
    ```
  5. Acceseaza serverul la adresa **http://localhost:3000**

  ## Linkuri Utile

  1. [[NEW] Spring Boot 3, Spring 6 & Hibernate for Beginners](https://www.udemy.com/share/101WHS3@9d3LM648qmiFL45JMrWnJhzbN1xArlqCCoqYULXGqiTYWHLBt2fLfHz89g5tve6CPQ==/)
  2. [[NEW] Master Spring Boot 3 & Spring Framework 6 with Java](https://www.udemy.com/share/107AgA3@dxRWXgSIENxl6FzscDuUNC2jhahIxX_6DV4n9px9GUso1JXi4brJVCH6caWEUl8f-g==/)
  3. [[NEW] Full-Stack Java Development with Spring Boot 3 & React](https://www.udemy.com/share/1094EW3@gZ9CMlXzZxfK3ZpL-YqEZQwR-Xa5CbvvsQiPnSsLCPsWSZOnVDyVhHEMzNt_pkFkcA==/)
  4. [The Complete 2024 Web Development Bootcamp](https://www.udemy.com/share/101qYw3@04gJyqBnKSCJmgRyjMhcIEsTgRZHBULJhggizXBRQojHglzlpr_gvBDwirWKgtWchQ==/)
  5. [Spring Initializr](https://start.spring.io)
  6. [Spring Boot Documentation](https://docs.spring.io/spring-boot/index.html)
  7. [React.js Documentation](https://legacy.reactjs.org/docs/getting-started.html)
  8. [Getting Started with Vite](https://vitejs.dev/guide/)

  




