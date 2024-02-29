const btn = document.querySelector('.hamburger')
const nav = document.querySelector('nav')

btn.addEventListener('click',function(){
    if(nav.classList.contains('show')){
        nav.classList.remove('show')
       
    }
    else{
      
        nav.classList.add('show')
    }
})
