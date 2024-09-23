const serverObjects = []

const addObject = (pData) => {
  if (!pData) {
    return
  }
  console.log(pData)
  serverObjects.push({
    ...pData,
    coordinates: JSON.stringify(pData.coordinates),
    metadata: JSON.stringify(pData.metadata),
  })
  emitNet('vrp:objects:prepareNewObject', -1, pData)
}
globalThis.exports('addObject', addObject)

const updateObject = (pData) => {
  if (!pData) {
    return
  }
  const objectIndex = serverObjects.findIndex((pDrop) => {
    return pDrop.id === pData.id
  })
  if (objectIndex === -1) {
    return
  }
  serverObjects[objectIndex] = pData
  emitNet('vrp-objects:updateObjects', -1, pData)
}
globalThis.exports('updateObject', updateObject)

const deleteObject = (pData) => {
  if (!pData) {
    console.log('No Data To Delete')
    return
  }
  const objectIndex = serverObjects.findIndex((pDrop) => {
    return pDrop.id === pData.id
  })
  if (objectIndex === -1) {
    return
  }
  serverObjects.splice(objectIndex, 1)
  emitNet('vrp-objects:clearObjects', -1, pData)
}
globalThis.exports('deleteObject', deleteObject)

onNet('vrp-objects:requestObjects', async () => {
  let src = source
  var result = await SQL.execute('SELECT * FROM __objects', {})
  var pObjects = []
  const moreObjects = result[0] ? result : []
  var array = [...serverObjects, ...moreObjects]
  for (const [k, v] of Object.entries(array)) {
    const pCoords = JSON.parse(v.coordinates)
    pObjects.push({
      ...v,
      id: v.id ?? v.randomId,
      model: v.model,
      coordinates: pCoords,
      metadata: JSON.parse(v.metadata),
    })
  }
  emitNet('vrp-objects:loadObjects', src, pObjects)
})
onNet(
  'vrp-objects:prepareObject',
  async (
    _0x5a1c03,
    _0xec222f,
    _0x4e2296,
    _0xbc1a44,
    _0x3c3d9a,
    _0x567a76
  ) => {
    let _0x40235e = {
        x: _0xec222f,
        y: _0x4e2296,
        z: _0xbc1a44,
        h: _0x3c3d9a,
      },
      _0x17e7da =
        Math.floor(10 * Math.random()).toString() +
        Math.floor(10 * Math.random()).toString() +
        Math.floor(10 * Math.random()).toString() +
        Math.floor(10 * Math.random()).toString()
    if (
      !(await SQL.execute(
        'INSERT INTO __objects (model, coordinates, metadata, randomId) VALUES (@model, @coordinates, @metadata, @randomId)',
        {
          model: _0x5a1c03,
          coordinates: JSON.stringify(_0x40235e),
          metadata: JSON.stringify(_0x567a76),
          randomId: _0x17e7da,
        }
      ))
    ) {
      return
    }
    let _0x5a6cdc = await SQL.execute(
      'SELECT * FROM __objects WHERE randomId = @randomId',
      { randomId: _0x17e7da }
    )
    if (!_0x5a6cdc[0]) {
      return
    }
    let _0x5aa71c = {
      id: _0x5a6cdc[0].id,
      model: _0x5a1c03,
      coordinates: _0x40235e,
      metadata: _0x567a76,
    }
    emitNet('vrp:objects:prepareNewObject', -1, _0x5aa71c)
  }
)
RPC.register(
  'vrp-objects:SaveObject',
  async (
    pSource,
    pNs,
    pModel,
    pCoords,
    pRotation,
    pMetadata
  ) => {
    let _0x235619 = {
        x: pCoords.x,
        y: pCoords.y,
        z: pCoords.z,
        h: pRotation,
      },
      _0x40e0d2 =
        Math.floor(10 * Math.random()).toString() +
        Math.floor(10 * Math.random()).toString() +
        Math.floor(10 * Math.random()).toString() +
        Math.floor(10 * Math.random()).toString()
    if (
      !(await SQL.execute(
        'INSERT INTO __objects (id, model, coordinates, metadata, randomId, ns) VALUES (@id, @model, @coordinates, @metadata, @randomId, @ns)',
        {
          id: `${pNs}_${_0x40e0d2}`,
          model: pModel,
          coordinates: JSON.stringify(_0x235619),
          metadata: JSON.stringify(pMetadata),
          randomId: _0x40e0d2,
          ns: pNs,
        }
      ))
    ) {
      return false
    }
    let _0x20083f = await SQL.execute(
      'SELECT * FROM __objects WHERE randomId = @randomId',
      { randomId: _0x40e0d2 }
    )
    if (!_0x20083f[0]) {
      return false
    }
    let _0x588249 = {
      id: _0x20083f[0].id,
      model: pModel,
      coordinates: _0x235619,
      metadata: pMetadata,
    }
    return emitNet('vrp:objects:prepareNewObject', -1, _0x588249), true
  }
)
RPC.register('vrp-objects:DeleteObject', async (_0x1d3045, _0x2078ee) => {
  let _0x5581c6 = await SQL.execute(
    'SELECT * FROM __objects WHERE id = @id',
    { id: _0x2078ee }
  )
  if (!_0x5581c6[0]) {
    return false
  }
  let _0x1edca6 = {
    id: _0x5581c6[0].id,
    model: _0x5581c6[0].model,
    coordinates: JSON.parse(_0x5581c6[0].coordinates),
    metadata: JSON.parse(_0x5581c6[0].metadata),
    randomId: _0x5581c6[0].randomId,
  }
  return (
    !!(await SQL.execute('DELETE FROM __objects WHERE id = @id', {
      id: _0x2078ee,
    })) && (emitNet('vrp-objects:clearObjects', -1, _0x1edca6), true)
  )
})

RPC.register(
  'vrp-objects:UpdateObject',
  async (_0x2f99f7, _0x49819b, _0x25e634) => {
    if (
      !(await SQL.execute(
        'UPDATE __objects SET model = @model WHERE id = @id',
        {
          model: _0x25e634,
          id: _0x49819b,
        }
      ))
    ) {
      return false
    }
    let _0x366af8 = await SQL.execute(
      'SELECT * FROM __objects WHERE id = @id',
      { id: _0x49819b }
    )
    if (!_0x366af8[0]) {
      return false
    }
    let _0x201f32 = {
      id: _0x366af8[0].id,
      model: _0x366af8[0].model,
      coordinates: JSON.parse(_0x366af8[0].coordinates),
      metadata: JSON.parse(_0x366af8[0].metadata),
      randomId: _0x366af8[0].randomId,
    }
    return emitNet('vrp-objects:updateObjects', -1, _0x201f32), true
  }
)