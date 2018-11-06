let submit = document.getElementById('submit');

submit.onclick = function(e) {
    e.preventDefault();
    let latitude = document.getElementById('latitude').value;
    let longitude = document.getElementById('longitude').value;
    let landAnim = document.getElementById('land-animation');
    let waterAnim = document.getElementById('sea-animation');
    landAnim.style = 'display: none';
    waterAnim.style = 'display: none';
    http.get(`https://api.onwater.io/api/v1/results/${latitude},${longitude}`)
    .then(response => {
        if(!JSON.parse(response).water) {
            landAnim.style = 'display: flex';
        } else {
            waterAnim.style = 'display: flex';
        }
    },
        error => alert(`Rejected: ${error}`));
};

let http = {
    get(url) {
        let animHide = document.getElementById('animHide');
        animHide.style = 'display: flex';
        return new Promise(function(resolve, reject) {
            
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
        
            xhr.onload = function() {   
            if (this.status === 200) {
                resolve(this.response);
                animHide.style = 'display: none';
            } else {
                let error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
            };
        
            xhr.onerror = function() {
            reject(new Error('Network Error'));
            };
        
            xhr.send();
        });
    }
};

