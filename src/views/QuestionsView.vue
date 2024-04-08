<template>
  <div class="questions">
    <div class="content">
      <h3>Kakvog su kvaliteta majice i šoljice?👕🤞</h3>
      <p>
        Naša kolekcija majica odlikuje se vrhunskim kvalitetom, koristeći
        <span class="important">pažljivo odabrani pamuk</span> i posebnu pažnju
        pri šivanju kako bi se osigurala dugotrajnost i udobnost. Također, naše
        šoljice su izrađene od
        <span class="important">visokokvalitetne keramike</span>, s posebnom
        pažnjom posvećenom detaljima kako bi se osigurala izdržljivost i
        estetska privlačnost. Ove proizvode odlikuje trajna vrijednost,
        pružajući zadovoljstvo korisnicima kroz dugi vremenski period.
      </p>
      <h3>Kako funkcioniše dostava i plaćanje?🚚💳</h3>
      <p>
        Prilikom naručivanja narudžbe imamo dvije opcije dostave; plaćanje
        pouzećem i plaćanje karticama <span class="important">(USKORO)</span>.
        Narudžba je na vašoj adresi kroz 5-7 radnih dana. Povrate novca ukoliko
        niste zadovoljni vršimo kroz 24h.
      </p>
      <h3>Slobodno pitaj🙌</h3>
      <p>
        Za ostala pitanja, suradnje, pohvale, kritike i ostalo možeš nam
        <a href="mailto:isprintajsvojtvit@gmail.com">poslati email</a> ili ako
        više preferiraš možeš nam se obratiti putem instagrama direktnom porukom
        na
        <a href="https://www.instagram.com/isprintajsvojtvit" target="_blank"
          >@isprintajsvojtvit🥳</a
        >
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.questions {
  height: 83%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.content {
  width: 50%;

  h3,
  p {
    text-align: center;
  }

  a {
    color: wheat;
  }
}

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
