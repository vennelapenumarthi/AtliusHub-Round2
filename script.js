document.getElementByID('registerForm').addEventListener('submit',function(event){
    const password =document.getElementByID('password').value;
    const confirmPassword=document.getElementById('confirmPassword').value;
    if(password !=confirmPassword){
        event.preventDefault();
        alert('Passwords doesnot match');
    }
    event.preventDefault();
    console.log('Profile form Submitted');
});
