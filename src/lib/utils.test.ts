import { describe, expect, test } from 'vitest'
import { cn } from './utils'

describe('Utils', () => {
  test('should concat classnames correctly', () => {
    expect(cn('ssssss', 'ssssssssss', ['dddddd.', '.ssssssssssss'])).toBe(
      'ssssss ssssssssss dddddd. .ssssssssssss'
    )
  })
})
