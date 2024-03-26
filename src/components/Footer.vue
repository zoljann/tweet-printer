<script setup lang="ts"></script>

<template>
  <div class="footer">
    <span
      >👕 Premium kvalitet majica
      <p>
        6.0 oz., 100% skupljeni pamuk u obliku prstena; idržljivi dvostruki
        šavovi na rukavima i donjem rubu; bez trganja
      </p></span
    >
    <span
      >🚚 Besplatna dostava
      <p>
        Dostava na području Bosne i Hercegovine, od datuma narudžbe kroz 5-7
        radnih dana je narudžba na vašoj adresi
      </p></span
    >
    <span
      >💰 Više načina plaćanja
      <p>Plaćanje pouzećem kuriru ili plaćanje VISA/MASTERCARD karticama 💳</p>
    </span>
  </div>
</template>

<style scoped lang="scss">
.footer {
  height: 7%;
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
    font-size: 12px;
    color: rgb(206, 206, 206);
  }
}

@media only screen and (max-width: 768px) {
  .footer {
    span {
      font-size: 12px;
      width: 30%;
    }

    p {
      display: none;
    }
  }
}
</style>
