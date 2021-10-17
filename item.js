import {items as item} from './items.js';
    
    const itemDesc = document.querySelector('.item-desc'),
          burger = document.querySelector('.burger'),
          navLinks = document.querySelector('.nav-links'),
          slider = document.querySelector('.slider'),
          sliderButtons =Array.from(document.querySelectorAll('.slider-controls button'));
   item.images.map( image => {
     slider.innerHTML += `
        <div class="slide">
          <img src="./images/${image}" style= "width:100%; height:100%" />
        </div>
     `
   });
     
     
     const slides = Array.from(document.querySelectorAll('.slide')),
           amountSpan = document.querySelector('.amount'),
           amountBtn = Array.from(document.querySelectorAll('.amount-panal button')),
           addBtn = document.querySelector('.add-btn'),
           cartBtn = document.querySelector('.cart-btn'),
           cartList = document.querySelector('.cart-list'),
           empty = document.querySelector('.cart-empty');
     
      let currentSlide = 0,
          amount = 0;
    const priceBeforeDiscount = item.itemPrice,
          discount = item.discount,
          priceAfterDiscount = priceBeforeDiscount * (discount / 100),
          itemsCount = document.querySelector('.items-count');
      
  
   sliderButtons.map(button => {
     button.addEventListener('click', e => {
      if(e.target.className === "next"){
      (currentSlide < slides.length-1) ? currentSlide++ : currentSlide = 0;
      slider.style.transform =  `translateX(-${slides[currentSlide].offsetLeft}px)`;
      }else{
      (currentSlide > 0) ? currentSlide-- : currentSlide = slides.length-1;
      slider.style.left =  `-${slides[currentSlide].offsetLeft}px`
      }
     })
   });
   
   (function renderData(){
    
   itemDesc.innerHTML = `<h5>${item.itemBrand}</h5>
     <h1>${item.itemTitle}</h1>
     <p>${item.itemDesc}</p>
     <div class="item-price">
       <span class="after-discount">$${priceAfterDiscount}</span>
       <span class="discount">${discount}%</span>
       <span class="before-discount">$${priceBeforeDiscount}</span>
     </div>
    `
    }())
    
    burger.addEventListener('click',() => {
      navLinks.classList.toggle('active')
    })
    amountSpan.innerHTML = `${amount}`
    amountBtn.map(btn => {
      btn.addEventListener('click', e => {
       if (e.target.className == "plus"){ amount++ ;
         amountSpan.innerHTML = `${amount}`
       }else{
        (amount >0)? amount--: amount = 0;
amountSpan.innerHTML = `${amount}`
}
      })
    })
    cartBtn.addEventListener('click', () => {
     cartList.classList.toggle('active');
    })
    addBtn.addEventListener('click', () => {
      console.log(amount);
      
      (amount == 0)? console.log('please select an amount') :
      empty.style.display = 'none';
      cartList.innerHTML += `<li class="cart-item">
      <div>
      <img src="./images/${item.images[0]}" style="width:60px; height:60px;"/>
      <h6 style="display: inline-block; margin-top: auto">${item.itemTitle}</h6>
      </div>
      <div>
        $${priceAfterDiscount} x ${amount} $${priceAfterDiscount * amount}
      </div>
      <button class='checkout'>checkout</button>
      </li>`
    })
    