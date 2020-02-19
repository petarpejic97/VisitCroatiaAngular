import { User2 } from '.'

let user2

beforeEach(async () => {
  user2 = await User2.create({ email: 'test', password: 'test', phoneNumber: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = user2.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(user2.id)
    expect(view.email).toBe(user2.email)
    expect(view.password).toBe(user2.password)
    expect(view.phoneNumber).toBe(user2.phoneNumber)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = user2.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(user2.id)
    expect(view.email).toBe(user2.email)
    expect(view.password).toBe(user2.password)
    expect(view.phoneNumber).toBe(user2.phoneNumber)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
