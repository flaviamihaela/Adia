import Hero from "@/components/Hero";
import Section from "@/components/Section";
import GalleryGrid from "@/components/GalleryGrid";
import SectionGP from "@/components/SectionGP";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero id="hero" />

      <SectionGP 
        id="proiecte" 
        label="Proiectele Noastre" 
        title="Ghidul Parintelui"
        buttonText="Acceseaza Ghidul"
        buttonUrl="https://ghidulparintelui.online/help"
      >
      Nu ezitam in fata provocarilor. La cererea voastra, am creat GhidulParintelui –
      un ghid digital care ii ajuta pe parinti sa gaseasca rapid scoli si gradinite potrivite
      pentru copiii lor. In doar cateva intrebari scurte, primiti o lista clara de optiuni.
      Lucram impreuna cu experti in educatie, specialisti juridici si consilieri din zona vocationala,
      astfel incat informatiile despre criterii, proceduri si trasee educationale sa fie cat mai clare 
      si corecte. GhidulParintelui economiseste ore de cautari și transformă haosul inscrierilor 
      intr-un proces simplu si prietenos pentru familiile ocupate.
      </SectionGP>

      <Section id="despre-noi" label="Despre Noi" title="In cautarea sensului si a frumosului.">
        ADIA - Asociatia de Dezvoltare Intelectuala si Arta - creeaza contexte frumoase in care 
        curiozitatea devine stil de viata. Organizatia sustine proiecte de cercetare, grupuri de 
        lectura, discutii tematice si initiative culturale care aduc impreuna oameni interesati de 
        gandire critica, arta si societate. Este un spatiu pentru lucru in profunzime, dialog calm si 
        invatare pe termen lung.
      </Section>

      <div id="evenimente">
        <Section label="Events" title="Initiativele frumoase ies mai bine impreuna.">
        Prin evenimentele ADIA conectam oameni interesati de educatie, spiritualitate, psihologie si 
        viata culturala urbana. Organizam discutii publice, grupuri de lectura, ateliere si lansari 
        de proiecte digitale, in care testam idei noi si le rafinam impreuna. Fiecare eveniment adauga 
        o piesa la misiunea noastra: o comunitate mai informata, mai critica si mai implicata civic.
        </Section>

        <GalleryGrid />
      </div>

      <Section label="Contact" title="Iti place cum suna?">
        Hai sa ne cunoastem mai bine! Scrie-ne pe platformele de socializare, pe email sau vino 
        direct la evenimentele noastre la Clubul de Marti! Daca ai o idee de proiect, vrei sa 
        propui un parteneriat sau pur si simplu sa ne vedem sa povestim, suntem intotdeauna deschisi 
        la colaborari.
      </Section>
      <Footer />
    </main>
  );
}
