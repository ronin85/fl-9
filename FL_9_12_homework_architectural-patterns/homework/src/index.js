import './style.scss';

const template = `
<div class="container">
<div class="search-block">
  <form class="search-form">
    <label>Search by name:
      <input type="text" id="searchField" placeholder="Enter user name">
    </label>
  </form>
</div>
<div class="table-wrap">
  <table class="users-table">
    <thead>
      <tr>
        <th>Photo</th>
        <th>Name</th>
        <th>Address</th>
        <th>Email</th>
        <th>Phone number</th>
        <th>Time zone</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody id="users">
    </tbody>
  </table>
</div>
<div class="show-more">
  <p class="users-count">Displayed <span id="displayed"></span> out of <span id="out-of"></span></p>
  <button class="btn" id="showMore">Load more</button>
</div>
</div>
`;

//--

const SHOW_MORE = 'SHOW_MORE';
const REMOVE_USER = 'REMOVE_USER';
const FILTER = 'FILTER';

function addAction(type, value) {
    return {
        type: type,
        value: value
    };
}

//--

const createStore = (reducer) => {
    let _state;
    const _listeners = [];
    const getState = () => {
        return _state;
    };
    const dispatch = (action) => {
        _state = reducer(_state, action);
        _listeners.forEach((cb) => {
            cb(_state);
        });
    };
    const subscribe = (cb) => {
        _listeners.push(cb);
    };
    dispatch();
    return {
        dispatch,
        subscribe,
        getState
    };
};


import DATA from './data';


const SHOWED_BY_DEFAULT = 5;
const STEP = 5;

function userStorage(defaultUsers) {
    let _users = defaultUsers;
    let _showed = SHOWED_BY_DEFAULT;
    const getUsers = () => {
        return _users;
    };
    const showByDefault = () => {
        return _users.slice(0, SHOWED_BY_DEFAULT);
    };
    const showMore = () => {
        return _users.slice(_showed, _showed += STEP);
    };
    const deleteUser = (removeId) => {
        return _users = _users.filter((user) => user.id != removeId);
    };
    return {
        getUsers,
        showByDefault,
        showMore,
        deleteUser
    };
}


const USERS = userStorage(DATA);

const root = document.getElementById('root');
root.innerHTML = template;

const DOM_ELEMENTS = {
    usersList: document.getElementById('users'),
    showMore: document.getElementById('showMore'),
    input: document.getElementById('searchField'),
    usersCount: document.querySelector('.users-count'),
    displayed: document.getElementById('displayed'),
    outOf: document.getElementById('out-of')
};

const rednderListOfUsers = (users) => {
    const template = users.map((user) => {
        return `
  <tr id=${ user.id }>
    <td class='user-img'><img src=${ user.picture } alt='photo....'></td>
    <td>${ user.name }</td>
    <td>${ user.location }</td>
    <td>${ user.email }</td>
    <td>${ user.phone }</td>
    <td>${ user.timezone }</td>
    <td><button class="btn btn-remove">Delete${user.id}</button></td>
  </tr>`;
    }).join('\n');
    DOM_ELEMENTS.usersList.innerHTML = template;
};
const defaultState = USERS.showByDefault();
const defaultAction = {
    type: 'Default'
};

const reducer = function (state = defaultState, action = defaultAction) {
    switch (action.type) {
        case SHOW_MORE:
            {
                if (action.value.length < STEP) {
                    DOM_ELEMENTS.showMore.classList.add('amimateToBottom');
                    setTimeout(() => {
                        DOM_ELEMENTS.showMore.classList.add('invisible');
                    }, 500);
                } else {
                    DOM_ELEMENTS.showMore.classList.remove('invisible', 'amimateToBottom');
                }
                return [...state, ...action.value];
            }
        case REMOVE_USER:
            {
                USERS.deleteUser(action.value);
                state = state.filter((user) => user.id != action.value);
                if (state.length < SHOWED_BY_DEFAULT) {
                    return state = USERS.showByDefault();
                };
                return state;
            }
        case FILTER:
            {
                return state.filter((user) => {
                    return user.name.indexOf(action.value) !== -1;
                });
            }
    }
    return state;
};

const store = createStore(reducer);

const displayedOutOf = () => {
    DOM_ELEMENTS.displayed.innerText = store.getState().length;
    DOM_ELEMENTS.outOf.innerText = USERS.getUsers().length;
};

displayedOutOf();
rednderListOfUsers(store.getState());

store.subscribe(displayedOutOf);
store.subscribe(() => {
    rednderListOfUsers(store.getState());
});

DOM_ELEMENTS.showMore.addEventListener('click', () => {
    const value = USERS.showMore();
    const action = addAction(SHOW_MORE, value);
    store.dispatch(action);
});

DOM_ELEMENTS.usersList.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-remove')) {
        const id = event.target.parentElement.parentElement.id;
        const action = addAction(REMOVE_USER, id);
        store.dispatch(action);
    }
});

DOM_ELEMENTS.input.addEventListener('keyup', (event) => {
    const action = addAction(FILTER, event.target.value);
    console.log(action);
    store.dispatch(action);
});