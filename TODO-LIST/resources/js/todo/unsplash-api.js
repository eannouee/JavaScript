let getBackgroundImage = async () => {
    let clientId ='w26w4pT7oW0cx2-s57S5sRMTy4nIvZmPKA14V_-iXOc';
    let url = 'https://api.unsplash.com/photos/random?';

    let params = {
        client_id : clientId,
        'orientation' :'landscape',
        query :'landscape'
    }

    let res = await fetch(url+getQueryString(params));
    let imgData = res.json();

    console.dir(imgData);
    return imgData;

}

let createUnsplashToken = async () => {
        // token이 없거나 token이 만료되었으면 api 호출을 통해 토큰을 생성
        let imgData = await getBackgroundImage();
        let imgURL = imgData.urls.regular;
    
        // null로 넘어오는 경우가 있음
        let location = imgData.location.name?imgData.location.name:'in multicampus...';
    
        // 만료 일자 지정
        let expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate()+1);
    
        let unSplashtoken = {
            url :imgURL,
            'location' : location,
            expiresOn : expirationDate.getTime()
    
        }
    
        localStorage.setItem('unsplashToken', JSON.stringify(unSplashtoken));
        return unSplashtoken;
    

}

let getUnsplashToken = async () => {

    let token = JSON.parse(localStorage.getItem('unsplashToken'));
    
    // token이 있고 token 만료되지 않았으면 기존 token을 반환
    let now = new Date().getTime;  //밀리세컨즈임
    if(token && token.expiresOn > now){
        //기존의 토큰값을 반환
        return token;
    }

    return await createUnsplashToken();


}

(async () => {
    let unSplashtoken = await getUnsplashToken();

    $('body').style.backgroundImage = `url(${unSplashtoken.url})`;
    
    let bgSpan = createElement('span', {text : unSplashtoken.location});
    $('.bg-location').append(bgSpan);

})();