import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "../../actions/courseActions";
import * as types from "../../actions/actionTypes";
import fetchMock from "fetch-mock";
import expect from "expect"; // You can use any testing library

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async actions", () => {
  const baseUrl = process.env.API_URL + "/courses/";
  afterEach(() => {
    fetchMock.restore();
  });

  it("creates FETCH_COURSE_SUCCESS when fetching todos has been done", () => {
    fetchMock.getOnce(baseUrl, {
      body: {
        courses: [
          {
            id: 1,
            title: "Securing React Apps with Auth0",
            slug: "react-auth0-authentication-security",
            authorId: 1,
            category: "JavaScript",
          },
        ],
      },
      headers: { "content-type": "application/json" },
    });

    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.LOAD_COURSES_SUCCESS, courses: {
        courses: [
          {
            id: 1,
            title: "Securing React Apps with Auth0",
            slug: "react-auth0-authentication-security",
            authorId: 1,
            category: "JavaScript",
          },
        ],
      } },
    ];
    const store = mockStore({ courses: [] });

    return store.dispatch(actions.loadCourses()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
