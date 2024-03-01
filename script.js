const btn = document.querySelector('.hamburger')
const nav = document.querySelector('nav')
const nav__link = document.querySelector('.nav-link')
const planetTemplate = document.getElementById('planetTemplate')
const main = document.querySelector('main')
let planetData;
btn.addEventListener('click',function(){
    if(nav.classList.contains('show')){
        nav.classList.remove('show')
       
    }
    else{
        nav.classList.add('show')
    }
})
nav__link.addEventListener('click',function(e){
    if(nav.classList.contains('show')){
        nav.classList.remove('show')
       
    }
})
async function fetchData(){
    try{
        const res = await fetch('./data.json')
        planetData = await res.json()
      
    }
    catch(e){
        console.log(e)
    }
}
fetchData()



function renderData(planet){
    const color = getComputedStyle(document.documentElement).getPropertyValue(`--${planet.name.toLowerCase()}`)

    const templateEle= document.importNode(planetTemplate.content,true) 
    const planetName = templateEle.querySelector('.planet__name')
    planetName.innerHTML = planet.name
    planetName.style.color = color
    const planetImage = templateEle.querySelector('.planet__image')
    planetImage.src=planet.images.planet
    templateEle.querySelector('.active').style.backgroundColor= color
    const planetDescription = templateEle.querySelector('.planet__description')
    planetDescription.innerHTML = planet.overview.content
   
    document.documentElement.style.setProperty('--color-font-general', '#000')

    const planetSourceLink = templateEle.querySelector('.planet__sourceLink')
    planetSourceLink.href = planet.overview.source

    const rotationValue = templateEle.querySelector('.rotationValue')
    rotationValue.innerHTML = planet.rotation

    const revolutionValue = templateEle.querySelector('.revolutionValue')
    revolutionValue.innerHTML = planet.revolution

    const radiusValue = templateEle.querySelector('.radiusValue')
    radiusValue.innerHTML = planet.radius
    console.log(planet)
    const averageValue = templateEle.querySelector('.averageValue')
    averageValue.innerHTML = planet.temperature
    const tabs = templateEle.querySelector('.planet__tabs')

    // if (window.matchMedia("(min-width: 800px)").matches){
    //     const allTabs = tabs.querySelectorAll('button')
    //     allTabs.forEach(tab=>{
    //         tab.addEventListener('mouseenter',function(e){
    //            tab.classList.add('hover')
    //         })
    //         if(!tab.classList.contains('active')){
    //             tab.addEventListener('mouseleave',function(e){
    //                 tab.classList.remove('hover')
    //             })
    //         }
    //     })

    // }
    // allTabs.forEach(tab=>{
    //     tab.addEventListener('mouseenter',function(e){
    //         tab.classList.add('hover')
    //     })
    //     if(!tab.classList.contains('active')){
    //         tab.addEventListener('mouseleave',function(e){
    //             tab.classList.remove('hover')
    //         })
    //     }
    // })
    tabs.addEventListener('click',function(e){
        const allTabs = tabs.querySelectorAll('button')
        allTabs.forEach(tab=>{
            if(tab.classList.contains('active')){
                tab.style.backgroundColor=''
                tab.classList.remove('active')
            }
            if(tab.classList.contains('hover')){
        
                tab.classList.remove('hover')
            }
            // if(!tab.classList.contains('active')){
            //     tab.addEventListener('mouseleave',function(e){
            //         tab.style.backgroundColor='transparent'
            //     })
            //     tab.addEventListener('mouseenter',function(e){
            //         tab.style.backgroundColor=color
            //     })
            // }
            // else{
            //     console.log('contains')
            //     tab.addEventListener('mouseleave',function(e){
            //         tab.style.backgroundColor=color
            //     })
            // }
        })
       
       if(e.target.closest('#overview')){
        console.log(  document.querySelector('#overview').firstElementChild)
            document.querySelector('#overview').firstElementChild.classList.add('active')
            document.querySelector('.active').style.backgroundColor= color
            internalTab(planetImage,planetDescription,planetSourceLink,planet.overview,planet.images.planet)
       }
       else if(e.target.closest('#structure')){
        document.querySelector('#structure').firstElementChild.classList.add('active')
        document.querySelector('.active').style.backgroundColor= color
        internalTab(planetImage,planetDescription,planetSourceLink,planet.structure,planet.images.internal)
       }

       else if(e.target.closest('#geology')){
        document.querySelector('#geology').firstElementChild.classList.add('active')
        document.querySelector('.active').style.backgroundColor= color
        internalTab(planetImage,planetDescription,planetSourceLink,planet.geology,planet.images.geology)
       }
       else{
        return
       }

    })
    main.appendChild(templateEle)
    

}   
function internalTab(planetImage,planetDescription,planetSourceLink,data,image){
    planetImage.src=image
    planetDescription.innerHTML = data.content
    planetSourceLink.href = data.source
}
nav__link.addEventListener('click',function(e){
    const links = nav__link.querySelectorAll('button')
    console.log(links)
        links.forEach(link=>{
            if(link.classList.contains('planet__active')){
                link.classList.remove('planet__active')
            }
        })
    planetData.forEach(planet=>{
        if(e.target.id == planet.name){
            clearElement(main)
            renderData(planet)
            e.target.classList.add('planet__active')
        }
    })
})

function clearElement(element){
    while(element.firstChild){
        element.removeChild(element.firstChild)
    }
}