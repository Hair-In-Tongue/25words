import { combineReducers } from 'redux'
import playerSlice from './reducers/playerSlice'
import loadingSlice from './reducers/loadingSlice'

export default combineReducers({
    player: playerSlice,
    loading: loadingSlice,
})
