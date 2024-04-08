<template>
  <div class="footer">
    <span
      >👕 Premium kvalitet majica
      <p>
        Izuzetno kvalitetne majice, izrađene od pamuka visoke gustoće, pružajući
        udobnost i dugotrajnost. Izdržljivi šavovi na rukavima garantuju
        trajnost i besprijekornost čak i nakon višestrukih pranja i nošenja
      </p></span
    >
    <span
      >🚚 Besplatna dostava
      <p>
        Dostava na području Bosne i Hercegovine
        <span class="important">(trenutno)</span>, narudžba je na vašoj adresi
        kroz 5-7 radnih dana
      </p></span
    >
    <span
      >💰 Više načina plaćanja
      <p>
        Plaćanje se vrši pouzećem kuriru
        <span class="important">(trenutno)</span>, a plaćanje visa/mastercard
        karticama <span class="important">(uskoro💳)</span>
      </p>
    </span>
  </div>
</template>

<style scoped lang="scss">
.footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  text-align: center;

  span {
    display: grid;
    align-content: center;
    width: 20%;
  }

  p {
    font-size: 0.8rem;
    color: var(--text-color);
  }

  .important {
    color: var(--text-color-error);
    display: inline;
  }
}

@media only screen and (max-height: 650px) {
  .footer {
    display: none;
  }
}

@media only screen and (max-width: 768px) {
  .footer {
    position: relative;
    flex-direction: column;
    align-items: center;

    span {
      width: 90%;
    }
  }
}
</style>
