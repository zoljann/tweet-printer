<template>
  <div class="questions">
    <div class="content">
      <h2>Česta pitanja i nešto o nama🤞</h2>
      <h3>O majicama i veličinama👕</h3>
      <p>
        Naše majice su poznate po svojoj vrhunskoj kvaliteti i udobnosti.
        Izrađene su od visokokvalitetnog pamuka koji pruža mekoću i
        dugotrajnost. Zahvaljujući pažljivoj izradi, ove majice zadržavaju svoj
        oblik i boju i nakon mnogih pranja. Dostupne su u crnim i bijelim
        bojama, te veličinama S, M, L i XL. Veličinu u centimetrima možete
        pogledati
        <a href="https://i.imgur.com/U9mtkwx.jpeg" target="_blank"
          >klikom ovdje</a
        >.
      </p>
      <h3>Dostava i plaćanje🚚💳</h3>
      <p>
        Prilikom porudžbine imamo tri opcije plaćanja, a to su:
        <span class="important">plaćanje pouzećem</span>(samo BiH),
        <span class="important">plaćanje debitnim/kreditnim karticama</span> ili
        <span class="important">PayPalom</span>. Narudžba se šalje brzom poštom
        i na vašoj adresi je kroz 3-5 radnih dana u BiH, a za ostale države 5-7
        radnih dana. Razlog dužine čekanja je što se svaka majica izrađuje
        posebno za vas, sa vašim izborom tvita. Povrate novca ukoliko niste
        zadovoljni vršimo kroz 24h od primanja porudžbine.
      </p>
      <h3>O nama</h3>
      <p>
        Mali tim koji je posvećen pružanju vrhunske korisničke podrške i
        iskustva kupovine. Vjerujemo da svaka kupovina predstavlja priliku za
        stvaranje posebnih veza i nezaboravnih iskustava. Za ostala pitanja,
        suradnje, pohvale, kritike i ostalo možeš nam
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
