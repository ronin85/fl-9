let container = document.getElementById('container');
let showModal = document.getElementById('show-modal');
let loadMore = $('#loadMore');


$.getJSON( "../src/data/media.json", function(json) {
    let currentObj = 12;
    let newObj = json.media.slice(0, currentObj);
    renderData(newObj);
    loadMore.click(function (e) { 
        e.preventDefault();
        newObj =  newObj.concat(json.media.slice(currentObj, currentObj += 6));
        renderData(newObj);
        if(currentObj > newObj.length){
            loadMore.hide();
        }
    });
    $(container).on('click', '.card', function (e) {
        e.preventDefault();
        showmodal(json, newObj, +$(this).attr('id'));
    });
});



function showmodal(json, obj, id) {
    $(showModal).css('display', 'flex');
    showModal.innerHTML = 
    `<div class="modal-block">
      <img class="block-img" src="../src/${obj[id].display_url}" alt="">
      <div class="block-content">
        <div class="block-header">
            <img class="header-logo" src="../src/${json.profile_pic_url}" alt="epam-logo">
            <div>
                <div>
                    <span class="header-username">${json.username}  &bull; </span>
                    <a class="header-link" href="#">Follow</a>
                </div>
                <span class="header-location">${obj[id].location}</span>
            </div>
        </div>
        <div class="comments">
            <span class="comments-username">${json.username}</span>
            <span class="comments-caption">${obj[id].edge_media_to_caption}</span>
        </div>
        <div>
            <span class="likes">${obj[id].edge_liked_by.count} likes</span>
            <input class="add-comment" placeholder="Add a comment...">
        </div>
      </div>
      <div class="controls">
        <span class="control control-left"></span>
        <span class="control control-right"></span>
        <span class="control-close">&times;</span>
      </div>
    </div>`;
    $('.control-close').click(function (e) { 
        e.preventDefault();
        $(showModal).css('display', 'none');
    });
    $('.control-left').click(function (e) {
        e.preventDefault();
        showmodal(json, obj, id-1);
    });
    $('.control-right').click(function (e) {
        e.preventDefault();
        showmodal(json, obj, id+1);
    })
}

function renderData(arr) {
    container.innerHTML = null;
    arr.forEach(element => {
        container.innerHTML += 
        `<div class="card" id="${element.id}">
            <div class="card-hide-info">
                <span class="icon icon1">${element.edge_liked_by.count}</span>
                <span class="icon icon2">${element.edge_media_to_comment.count}</span>
            </div>
            <img class="card-img" src="${element.display_url}"></img>
        </div>`;
    });
}





