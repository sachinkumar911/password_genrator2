const lengthslider=document.querySelector('[ data-leghtslider]');
const displaypassword= document.querySelector('[data-displaypassword]')
const  copybtn=document.querySelector('[data-copy]');
const cpymsg=document.querySelector('[data-copymsg]');
const lengthdisplay=document.querySelector('[data-lenghtnumber]');
const uppercase=document.querySelector('#uppercase');
const lowercase=document.querySelector('#lowercase');
const numbers=document.querySelector('#numbers');
const symbols=document.querySelector('#symbol');
const gentratorbtn=document.querySelector('.generate');
const indicator =document.querySelector('.indicator');
const allcheckbox=document.querySelectorAll('input[type=checkbox]');

var str="!@#$%^&*()_+=-:;.>,</?\|";
let password="";
let passwordlength =10;
let checkcnt=0;
handelslider();


function handelslider()
{
    lengthslider.value=passwordlength;
    lengthdisplay.textContent=passwordlength;
}
function setindicator(color){
    indicator.style.backgroundColor=color;
}


function itnegergenrator(min ,max)
{   return Math.floor((Math.random()*(max-min))+min);

}
function genraterandomnumber()
{
   return itnegergenrator(0,9);
}

function generatelowercase()
{
    return String.fromCharCode(itnegergenrator(97,123));
}

function generateuppercase()
{
    console.log(String.fromCharCode(itnegergenrator(65,91)));
    return String.fromCharCode(itnegergenrator(65,91));
    
}

function generatesymbol()
{
    const charr=itnegergenrator(0,str.length);
    return str.charAt(charr);
}

function calcstrength()
{
    let hasupper=false;
    let haslower=false;
    let hasnum=false;
    let hassym=false;
    if(uppercase.checked) hasupper=true;
    if(lowercase.checked) haslower=true;
    if(numbers.checked) hasnum=true;
    if(symbols.checked) hassym=true;
    

    if(hasupper&& haslower && (hasnum || hassym)&& passwordlength>=8)
    {
        setindicator("#0f0");
    }
    else if( (haslower||hasupper||hasnum|| hassym)&& passwordlength>=6)
    {
        setindicator("#ff0");
    }
    else{
        setindicator("#f00");
    }
}

async function copycontent()
{
    try{
        await navigator.clipboard.writeText(displaypassword.value);
        cpymsg.textContent="Coppied!";
    }
    catch(e){
        cpymsg.textContent="Failed!";

    }

    cpymsg.classList.add("active");
    setTimeout(()=>{
        cpymsg.classList.remove("active");
    },2000);
}


lengthslider.addEventListener('input',(e)=>{
    passwordlength=e.target.value;
    handelslider();
})

copybtn.addEventListener('click',()=>{
    if(displaypassword.value)
    copycontent();
})

function shuffulepassword(array)
{
  for(let i=array.length-1;i>0;i--)
  {
    const j=Math.floor(Math.random()*(i+1));
    const temp= array[i];
    array[i]=array[j];
    array[j]=temp;
  }

  let strr="";
  array.forEach((et)=>(strr+=et))
  return strr;
}



allcheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change', ()=>{
        checkcnt=0;
        allcheckbox.forEach((checkbox)=>{
            if(checkbox.checked)
                checkcnt++;
        })
        console.log(checkcnt)
    });
    if(passwordlength<checkcnt)
    {
        passwordlength=checkcnt;
        handelslider();
    }
    
})

gentratorbtn.addEventListener('click',()=>{
    

    if(checkcnt==0)
    {console.log("hi im here")
        return;}

    if(passwordlength<checkcnt)
    {
        passwordlength=checkcnt
        handelslider();m
    }
   
    password="";
    let functarr=[];
    console.log(uppercase);
    if(uppercase.checked)
    {
        functarr.push(generateuppercase);}
    
    if(lowercase.checked)
    functarr.push(generatelowercase);

    if(numbers.checked)
    functarr.push(genraterandomnumber);

    if(symbols.checked)
    functarr.push(generatesymbol);
    
    console.log(functarr)


    for(let i=0;i<functarr.length;i++)
    {
        password +=functarr[i]();
        
        
    }

    for(let i=0;i<passwordlength-functarr.length;i++)
    {
        let randind= itnegergenrator(0,functarr.length);
        password+=functarr[randind]();
        
    }
   


    password= shuffulepassword(Array.from(password));
    

    displaypassword.value=password;
        calcstrength();

})