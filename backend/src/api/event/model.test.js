import { Event } from '.'

let event

beforeEach(async () => {
  event = await Event.create({ name: 'test', dateStart: 'test', dateEnd: 'test', location: 'test', type: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = event.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(event.id)
    expect(view.name).toBe(event.name)
    expect(view.dateStart).toBe(event.dateStart)
    expect(view.dateEnd).toBe(event.dateEnd)
    expect(view.location).toBe(event.location)
    expect(view.type).toBe(event.type)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = event.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(event.id)
    expect(view.name).toBe(event.name)
    expect(view.dateStart).toBe(event.dateStart)
    expect(view.dateEnd).toBe(event.dateEnd)
    expect(view.location).toBe(event.location)
    expect(view.type).toBe(event.type)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
