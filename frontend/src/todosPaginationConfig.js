import { createPaginator } from 'redux-cached-pagination';
import { normalize, schema } from 'normalizr';
import api from './api';

export const ELEMENTS_PER_PAGE = 6;

const todo = new schema.Entity('todos');
const responseSchema = new schema.Object({ elements: new schema.Array(todo) });

const normalizeResponse = serverResponse => {
  const normalizedData = normalize(serverResponse, responseSchema);
  const notNullEntities = normalizedData.entities.todos ? normalizedData.entities.todos : [];
  return {
    totalElements: serverResponse.totalElements,
    elements: normalizedData.result.elements,
    entities: notNullEntities
  };
};

const todosApi = async (page, requestParams) => {
  const offset = (page - 1) * ELEMENTS_PER_PAGE
  const { searchPhrase } = requestParams;
  console.log('todosApi fired searchPhrase')
  return new Promise(async (resolve) => {
    const serverResponse = await api.todo.fetchTodosByUser({ offset, limit: ELEMENTS_PER_PAGE, searchText: searchPhrase })
    const formattedResponse = normalizeResponse(serverResponse);
    resolve(formattedResponse);
  });
};
// const todosApi = (page, requestParams) => {
//   const { offset, limit, searchText } = requestParams;
//   return new Promise((resolve, reject) => {
//     const xhttp = new XMLHttpRequest()
//     const token = localStorage.getItem('gpbTodosJWT')
//     xhttp.open('GET', '/api/todo/todos_by_user', true)
//     xhttp.setRequestHeader('authorization', `Bearer ${token}`)
//     xhttp.onload = function () {
//       console.log('xhttp response = ', xhttp.response)
//       const nr = normalizeResponse({ todos: xhttp.response.todos, count: xhttp.response.count })
//       console.log('xhttp nr = ', nr)
//       if (xhttp.status === 200) {
//         resolve({ todos: xhttp.response.todos, count: xhttp.response.count })
//       } else {
//         reject(xhttp.statusText)
//       }
//     }
//     xhttp.onerror = function () {
//       reject(xhttp.statusText)
//     }
//     xhttp.send()
//   });
// };


const searchParamsInitState = { searchPhrase: '' };

// default config below
const config = {
  refreshResultInBackground: true,
  timeToRefresh: 10000, // [ms]
  searchHistoryLength: 5,
  elementsPerPage: ELEMENTS_PER_PAGE
};

const todosPaginator = createPaginator(
  'todosPagination',
  todosApi,
  config,
  searchParamsInitState
);

export const paginatorStoreName = todosPaginator.storeName;

// export used methods
export const loadTodosPage = todosPaginator.requestPage;
export const todosPaginatorReducers = todosPaginator.reducers;
export const todosStoreName = todosPaginator.storeName;
export const { updateSearchParams } = todosPaginator;

export const { setCurrentPage } = todosPaginator;
export const { getCurrentPage } = todosPaginator.selectors;

// selectors:
export const { getTotalElements } = todosPaginator.selectors;
export const { getPage } = todosPaginator.selectors;
export const { getSearchParams } = todosPaginator.selectors;
