const btn = document.querySelector('.hamburger')
const nav = document.querySelector('nav')
const nav__link = document.querySelector('.nav-link')
const planetTemplate = document.getElementById('planetTemplate')
const main = document.querySelector('main')
let planetData;
let timer;
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
    document.body.removeAttribute('class')
    const color = getComputedStyle(document.documentElement).getPropertyValue(`--${planet.name.toLowerCase()}`)
    document.body.classList.add(planet.name.toLowerCase())
    const templateEle= document.importNode(planetTemplate.content,true) 
    const planetName = templateEle.querySelector('.planet__name')
    planetName.innerHTML = planet.name
    planetName.setAttribute('class','textAnimation')
    planetName.style.color = color
    const planetImage = templateEle.querySelector('.planet__image')
    planetImage.src=planet.images.planet
    planetImage.className+=' zoom-in'
    templateEle.querySelector('.active').style.backgroundColor= color
    const planetDescription = templateEle.querySelector('.planet__description')
    planetDescription.innerHTML = planet.overview.content
    planetDescription.className+=' bottom-animation'
    document.documentElement.style.setProperty('--color-font-general', '#000')

    const planetSourceLink = templateEle.querySelector('.planet__sourceLink')
    planetSourceLink.href = planet.overview.source

    const rotationValue = templateEle.querySelector('.rotationValue')
    rotationValue.innerHTML = planet.rotation

    const revolutionValue = templateEle.querySelector('.revolutionValue')
    revolutionValue.innerHTML = planet.revolution
 

    const radiusValue = templateEle.querySelector('.radiusValue')
    radiusValue.innerHTML = planet.radius


    const averageValue = templateEle.querySelector('.averageValue')
    averageValue.innerHTML = planet.temperature


    const tabs = templateEle.querySelector('.planet__tabs')

    const overview = templateEle.querySelector('#overview')
    const allTabs = tabs.querySelectorAll('button')
    overview.addEventListener('click',function(){
            removeAllActiveClassess(allTabs)
            document.querySelector('#overview').firstElementChild.classList.add('active')
            document.querySelector('.active').style.backgroundColor= color
            internalTab(planetImage,planetDescription,planetSourceLink,planet.overview,planet.images.planet)
    })
    const structure = templateEle.querySelector('#structure')
    structure.addEventListener('click',function(){
        removeAllActiveClassess(allTabs)
        document.querySelector('#structure').firstElementChild.classList.add('active')
        document.querySelector('.active').style.backgroundColor= color
        internalTab(planetImage,planetDescription,planetSourceLink,planet.structure,planet.images.internal)
    })
    const geology = templateEle.querySelector('#geology')
    geology.addEventListener('click',function(){
            removeAllActiveClassess(allTabs)
            document.querySelector('#geology').firstElementChild.classList.add('active')
            document.querySelector('.active').style.backgroundColor= color
            internalTab(planetImage,planetDescription,planetSourceLink,planet.geology,planet.images.geology)
    
    })
    main.appendChild(templateEle)
    

} 
function removeAllActiveClassess(allTabs){
    allTabs.forEach(tab=>{
        if(tab.classList.contains('active')){
            tab.style.backgroundColor=''
            tab.classList.remove('active')
        } 

    })

}  
function internalTab(planetImage,planetDescription,planetSourceLink,data,image){
    if(planetDescription.classList.contains('bottom-animation')){
        planetDescription.classList.remove('bottom-animation')
    }
    if(planetImage.classList.contains('zoom-in')){
        clearTimeout(timer)
        planetImage.classList.remove('zoom-in')
    }
    timer =setTimeout(()=>{
        planetDescription.classList.add('bottom-animation')
        planetImage.classList.add('zoom-in')
        planetImage.src=image
        planetDescription.innerHTML = data.content
        planetSourceLink.href = data.source
    },500)
   
}
nav__link.addEventListener('click',function(e){
    const links = nav__link.querySelectorAll('button')
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