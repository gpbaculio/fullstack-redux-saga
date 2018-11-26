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
  return new Promise(async (resolve) => {
    const serverResponse = await api.todo.fetchTodosByUser({ offset, limit: ELEMENTS_PER_PAGE, searchText: searchPhrase })
    const formattedResponse = normalizeResponse(serverResponse);
    resolve(formattedResponse);
  });
};

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
