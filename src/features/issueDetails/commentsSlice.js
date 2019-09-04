import { createSlice } from 'redux-starter-kit'
import { getComments } from 'api/githubAPI'
const initialState = {
  commentsByIssue: {},
  loading: false,
  error: null
}
const comments = createSlice({
  slice: 'comments',
  initialState,
  reducers: {
    getCommentsStart(state) {
      state.loading = true
      state.error = null
    },
    getCommentsSuccess(state, action) {
      const { comments, issueId } = action.payload
      state.commentsByIssue[issueId] = comments
      state.loading = false
      state.error = null
    },
    getCommentsFailure(state, action) {
      state.loading = false
      state.error = action.payload
    }
  }
})
export const {
  getCommentsStart,
  getCommentsSuccess,
  getCommentsFailure
} = comments.actions
export default comments.reducer
export const fetchComments = issue => async dispatch => {
  try {
    dispatch(getCommentsStart())
    const comments = await getComments(issue.comments_url)
    dispatch(getCommentsSuccess({ issueId: issue.number, comments }))
  } catch (err) {
    dispatch(getCommentsFailure(err))
  }
}
