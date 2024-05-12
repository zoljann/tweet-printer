<template>
  <div class="questions">
    <div class="content">
      <h3>Kakvog su kvaliteta majice?👕🤞</h3>
      <p>
        Naša kolekcija majica odlikuje se vrhunskom kvalitetom, koristeći
        <span class="important">pažljivo odabrani pamuk</span> i posebnu pažnju
        pri šivanju kako bi se osigurala dugotrajnost i udobnost. Posvećenost
        detaljima osigurava da svaka majica nosi pečat vrhunske izrade i pažnje
        prema kvalitetu. Ove proizvode odlikuje trajna vrijednost, pružajući
        zadovoljstvo korisnicima kroz dugi vremenski period.
      </p>
      <h3>Kako funkcioniše dostava i plaćanje?🚚💳</h3>
      <p>
        Prilikom porudžbine imamo dvije opcije dostave;
        <span class="important">plaćanje pouzećem</span>(samo BiH) i
        <span class="important">plaćanje karticama ili paypalom</span>. Narudžba
        je na vašoj adresi kroz 3-5 radnih dana u BiH, a za ostale države 5-7
        radnih dana(uz odrđene varijacije). Povrate novca ukoliko niste
        zadovoljni vršimo kroz 24h od primanja porudžbine.
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
  width: 50%;

  h3,
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
