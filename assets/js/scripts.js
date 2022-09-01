const avatarFeaturesUrl = "https://raw.githubusercontent.com/sebastrog/datappi/main/avatarcreator/js/data.js";
/* const avatarFeaturesUrl = "../assets/js/data.js"; */

const hair = document.getElementById('hair');
const face = document.getElementById('face');
const eyes = document.getElementById('eyes');
const mouth = document.getElementById('mouth');
const outfit = document.getElementById('outfit');
const bg = document.getElementById('bg');

const showHairsList = document.getElementById('showHairsList');
const showFacesList = document.getElementById('showFacesList');
const showEyesList = document.getElementById('showEyesList');
const showOutfitList = document.getElementById('showOutfitList');
const showMouthList = document.getElementById('showMouthList');
const showBgList = document.getElementById('showBgList');

const printFeatures = (arr, type, showAt) => {
    arr[0][type].forEach(function(el){
        let getTemplate = `
            <li>
                <button onclick="onSelectedFeature('${type}', '${el}')">
                    <img src="./assets/img/${type}/${el}.svg" alt="${type}">
                </button>
            </li>
        `
        if(showAt === 'showHairsList') return showHairsList.innerHTML+= getTemplate;
        if(showAt === 'showFacesList') return showFacesList.innerHTML+= getTemplate;
        if(showAt === 'showEyesList') return showEyesList.innerHTML+= getTemplate;
        if(showAt === 'showMouthList') return showMouthList.innerHTML+= getTemplate;
        if(showAt === 'showOutfitList') return showOutfitList.innerHTML+= getTemplate;
        if(showAt === 'showBgList') return showBgList.innerHTML+= getTemplate;
    })
}

const showRandomFeature = (arr, type) => {
    const option = arr[0][type][Math.floor(Math.random() * arr[0][type].length)];
    onSelectedFeature(type, option)
}

const getArrFeatures = async () => {
    const getFeaturesFromUrl = await fetch(avatarFeaturesUrl).then(response => response.json());
    printFeatures(getFeaturesFromUrl, 'hair', 'showHairsList');
    printFeatures(getFeaturesFromUrl, 'face', 'showFacesList');
    printFeatures(getFeaturesFromUrl, 'eyes', 'showEyesList');
    printFeatures(getFeaturesFromUrl, 'mouth', 'showMouthList');
    printFeatures(getFeaturesFromUrl, 'outfit', 'showOutfitList');
    printFeatures(getFeaturesFromUrl, 'bg', 'showBgList');

    showRandomFeature(getFeaturesFromUrl, 'hair');
    showRandomFeature(getFeaturesFromUrl, 'face');
    showRandomFeature(getFeaturesFromUrl, 'eyes');
    showRandomFeature(getFeaturesFromUrl, 'mouth');
    showRandomFeature(getFeaturesFromUrl, 'outfit');
    showRandomFeature(getFeaturesFromUrl, 'bg');
}

getArrFeatures();

const onSelectedFeature = (type, option ) => {
    switch(type) {
        case 'hair':
            hair.src=`./assets/img/hair/${option}.svg`;
            break
        case 'face':
            face.src=`./assets/img/face/${option}.svg`;
            break
        case 'eyes':
            eyes.src=`./assets/img/eyes/${option}.svg`;
            break
        case 'mouth':
            mouth.src=`./assets/img/mouth/${option}.svg`;
            break
        case 'outfit':
            outfit.src=`./assets/img/outfit/${option}.svg`;
            break
        case 'bg':
            bg.src=`./assets/img/bg/${option}.svg`;
            break
    }
}


const removePXfromLeftPosition = (string) => {
    if( string ) return string.replace(/px/, '')
    return;
}

const computedStyle = (toCompute) => {
    if( toCompute ) return getComputedStyle(toCompute)
    return;
}

const getPositionToMove = (element, direction) => {
    const getLeftElement = computedStyle(element).getPropertyValue("left");

    switch(direction) {
        case 'up':
            element.style.top = element.offsetTop-2+"px"
            break
        case 'down':
            element.style.top = element.offsetTop+2+"px"
            break
        case 'left':
            element.style.left = parseInt(removePXfromLeftPosition(getLeftElement))-2+"px"
            break
        case 'right':
            element.style.left = parseInt(removePXfromLeftPosition(getLeftElement)) + 2+"px"
            break
    }
}

const move = (feature, direction) => {
    
    if( feature === 'hair' ) {
        getPositionToMove(hair, direction)
    }
    
    if( feature === 'face' ) {
        getPositionToMove(face, direction)
    }

    if( feature === 'eyes' ) {
        getPositionToMove(eyes, direction)
    }

    if( feature === 'mouth' ) {
        getPositionToMove(mouth, direction)
    }
    
    if( feature === 'outfit' ) {
        getPositionToMove(outfit, direction)
    }

    if( feature === 'bg' ) {
        getPositionToMove(bg, direction)
    }
}

const exportAvatar = () => {
    const node = document.getElementById('my-node');
    const generate = document.getElementById('generateContainer');
    generate.innerHTML = ""

    domtoimage.toPng(node)
    .then (function (dataUrl) {
        const img = new Image();
        img.src = dataUrl;
        generate.appendChild(img);
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });

    /* domtoimage.toBlob(document.getElementById('my-node'))
    .then(function (blob) {
        window.saveAs(blob, 'my-node.png');
    }); */
}

