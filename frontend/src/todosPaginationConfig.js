import { createPaginator } from 'redux-cached-pagination';
import { normalize, schema } from 'normalizr';
import api from './api';

export const ELEMENTS_PER_PAGE = 10;

const todo = new schema.Entity('todos');
const responseSchema = new schema.Object({ elements: new schema.Array(todo) });

const normalizeResponse = serverResponse => {
  console.log('serverResponse = ', serverResponse)
  const normalizedData = normalize(serverResponse, responseSchema);
  console.log('normalizedData = ', normalizedData)
  const notNullEntities = normalizedData.entities.examinations ? normalizedData.entities.examinations : [];
  console.log('notNullEntities = ', notNullEntities)
  return {
    totalElements: serverResponse.count,
    elements: normalizedData.result.elements,
    entities: notNullEntities
  };
};

const todosApi = (page, requestParams) => {
  const { offset, limit, searchText } = requestParams;
  return new Promise((resolve) => {
    const serverResponse = api.todo.fetchTodosByUser({ offset, limit, searchText })
    const formattedResponse = normalizeResponse(serverResponse);
    resolve(formattedResponse);
  });
};

const searchParamsInitState = { searchText: '' };

// default config below
const config = {
  refreshResultInBackground: true,
  timeToRefresh: 3000, // [ms]
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
