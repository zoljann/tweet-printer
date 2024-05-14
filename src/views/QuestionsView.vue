<template>
  <div class="questions">
    <div class="content">
      <h2>Česta pitanja i nešto o nama🤞</h2>
      <h3>Kakvog su kvaliteta majice?👕</h3>
      <p>
        Naša kolekcija majica odlikuje se vrhunskom kvalitetom, koristeći
        <span class="important">pažljivo odabrani pamuk</span> i posebnu pažnju
        pri šivanju kako bi se osigurala dugotrajnost i udobnost. Posvećenost
        detaljima osigurava da svaka majica nosi pečat vrhunske izrade i pažnje
        prema kvalitetu. Ove proizvode odlikuje trajna vrijednost, pružajući
        zadovoljstvo korisnicima kroz dugi vremenski period. Njihova mekana
        tkanina pruža osjećaj ugodnosti tokom cijelog dana. Ove majice su
        izdržljive i zadržavaju oblik čak i nakon višestrukih pranja.
      </p>
      <h3>Kako funkcioniše dostava i plaćanje?🚚💳</h3>
      <p>
        Prilikom porudžbine imamo tri opcije plaćanja, a to su:
        <span class="important">plaćanje pouzećem</span>(samo BiH),
        <span class="important">plaćanje debitnim/kreditnim karticama</span> ili
        <span class="important">paypalom</span>. Narudžba je na vašoj adresi
        kroz 3-5 radnih dana u BiH, a za ostale države 5-7 radnih dana(uz
        odrđene varijacije). Povrate novca ukoliko niste zadovoljni vršimo kroz
        24h od primanja porudžbine.
      </p>
      <h3>O nama</h3>
      <p>
        Naša misija je spoj strasti prema vrhunskim majicama i predanosti
        pružanju izvanredne usluge našim kupcima. Ponosno ističemo da nismo
        običan prodavač majica - svaka majica koju nudimo izrađuje se po
        narudžbi s pažnjom i ljubavlju. Naš tim posvećen je pružanju vrhunske
        korisničke podrške i iskustva kupovine obogaćenog ljubaznošću i
        profesionalnošću. Vjerujemo da svaka kupovina predstavlja priliku za
        stvaranje posebnih veza i nezaboravnih iskustava.
      </p>
      <h3>Slobodno pitaj🙌</h3>
      <p>
        Za ostala pitanja, suradnje, pohvale, kritike i ostalo možeš nam
        <a href="mailto:isprintajsvojtvit@gmail.com">poslati email</a> ili ako
        više preferiraš možeš nam se obratiti putem instagrama direktnom porukom
        na
        <a href="https://www.instagram.com/isprintajsvojtvit" target="_blank"
          >@isprintajsvojtvit🥳</a
        >.
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.questions {
  cursor: default;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
}

.content {
  width: 60%;

  h3,
  h2,
  p {
    text-align: center;
  }

  h3 {
    color: var(--text-color-error);
  }
}

a,
.important {
  color: var(--text-color-error);
}

@media only screen and (max-width: 768px) {
  .questions {
    justify-content: start;
  }

  .content {
    width: 95%;
  }
}
</style>
