import reducer from "../../reducers/courseReducer";
import * as types from "../../actions/actionTypes";
import initialState from "../initalState";

describe("course reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(null, {})).toEqual(initialState);
  });

  it("should handle CREATE_COURSE", () => {
    expect(
      reducer([], {
        type: types.BEGIN_API_CALL,
        courses: {
          title: "Securing React Apps with Auth0",
          slug: "react-auth0-authentication-security",
          authorId: 1,
          category: "JavaScript",
        },
      })
    ).toEqual([
      {
        title: "Securing React Apps with Auth0",
        slug: "react-auth0-authentication-security",
        authorId: 1,
        category: "JavaScript",
        id: 1,
      },
    ]);

    expect(
      reducer(
        [
          {
            title: "Securing React Apps with Auth0",
            slug: "react-auth0-authentication-security",
            authorId: 1,
            category: "JavaScript",
            id: 1,
          },
        ],
        {
          type: types.BEGIN_API_CALL,
          courses: {
            title: "React: The Big Picture",
            slug: "react-big-picture",
            authorId: 1,
            category: "JavaScript",
          },
        }
      )
    ).toEqual([
      {
        id: 1,
        title: "Securing React Apps with Auth0",
        slug: "react-auth0-authentication-security",
        authorId: 1,
        category: "JavaScript",
      },
      {
        id: 2,
        title: "React: The Big Picture",
        slug: "react-big-picture",
        authorId: 1,
        category: "JavaScript",
      },
    ]);
  });
});
