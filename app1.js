const brandUrl='https://api.stbdownload.com/software-api/info/get-brand';
const brandItemEl=document.getElementById('brandItems');

//search functionality 

document.getElementById('search').addEventListener('keyup', function() {
    let inputVal = this.value.toLowerCase();
    let softwareInfo = document.getElementsByClassName('softwareInfo');
    Array.from(softwareInfo).forEach(function(element) {
        let brandName = element.getAttribute('brandName');
        if (brandName.toLowerCase().indexOf(inputVal) === -1) {
            element.style.display = 'none';
        } else {
            element.style.display = 'block';
        }
    });
});


// Sidbar

// document.addEventListener("DOMContentLoaded", function() {
//     // JavaScript for expand and collapse the sidebar
//     document.querySelector(".menu-btn").addEventListener("click", function() {
//       document.querySelector(".side-bar").classList.add("active");
//       document.querySelector(".menu-btn").style.visibility = "hidden";
//     });
  
//     document.querySelector(".close-btn").addEventListener("click", function() {
//       document.querySelector(".side-bar").classList.remove("active");
//       document.querySelector(".menu-btn").style.visibility = "visible";
//     });
//   });


$(document).ready(function () {
    getBrands();
});


//  sideBar brands

function getBrands(){
    fetch(brandUrl).then(res => res.json())
    .then(apiResult=>{

        apiResult.brands.forEach( brand => {
            const brandItem=document.createElement('div');
            brandItem.classList.add('item')
            const itemLink=document.createElement('a')
            itemLink.setAttribute("onclick", "loadSoftwares('" + brand + "')")
            itemLink.innerText=brand;
            brandItemEl.appendChild(brandItem);
            brandItem.appendChild(itemLink);
        });
        loadSoftwares(apiResult.brands[0]);

    });
}


// load software of each brand

function loadSoftwares(brandName){
    
    fetch('https://api.stbdownload.com/software-api/public/?tag=' + brandName)
    .then(res => res.json())
    .then(softwares => {
      let allModelInfo = '';
        softwares.forEach(software => {
            allModelInfo += renderCards(software);

        });
    document.getElementById('cards').innerHTML=allModelInfo;
       
    })
   
  
}



// render the card of each software 

function renderCards(modelInfo){

    let cards="";
       return  cards +=`
        <div class="device softwareInfo" brandName=${modelInfo.name}>
        
        <div class="header">
            <div class="head" >
             <div class="name">${modelInfo.name}</div>
             <div class="button">
             <button><a href=${modelInfo.software.url} >Software</a></button>
             <button><a href=${modelInfo.software.romUrl}>Rom</a></button>
             </div>
           
             </div>
             <p class="disc"> <span>Version</span> : ${modelInfo.software.version}<br> <span>Update</span> : ${modelInfo.software.updateOn}</p>
            
        </div>
        <div class="content">
            <img src=${modelInfo.image} alt="" onerror="this.src='./404.png'">
        </div>
    
    </div>
    `
}
    




