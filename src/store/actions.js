import { log, isDev, param } from '@/utils'
import xhr from 'axios'

/* eslint-disable */
// https://gist.github.com/JixunMoe/6db9a453ab247d46b819
/**
 * Bind generator with context preserved.
 * @param  {Generator} fn The generator
 * @return {Generator}    Generator with arguments bind.
 */
var _bind = function (fn) {
  var args = [].slice.call(arguments, 1);
  return function* () {
    var ir = fn.apply(this, args.concat.apply(args, arguments));
    var n;
    while (!(next = ir.next()).done)
      yield n.value;
  };
}
/* eslint-enable */

export const GET_TRACKS = ({ state, commit }, payload) => {
  let queryURI
  if (state.offset) {
    queryURI = payload
  } else {
    // https://github.com/mzabriskie/axios/issues/350#issuecomment-227270046
    const params = param(Object.assign({}, state.vendor.queryDefaults, {
      q: payload,
      linked_partitioning: true,
      // geo filtering
      // US 37.0902° N, 95.7129° W
      // EU 54.5260° N, 15.2551° W
      // https://developers.soundcloud.com/docs/api/reference#tracks
      tag_list: 'geo:lat=54.5260%20geo:lon=15.2551?format=json'
    }))
    queryURI = `https://api.soundcloud.com/tracks?${params}` // a redundant reference to ease debugging    
  }
  xhr.get(queryURI).then(({ data }) => {
    commit('TRACKS', {
      data,
      queryURI
    })
  })
}
