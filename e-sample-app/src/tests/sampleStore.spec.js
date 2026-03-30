import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useSampleAPI } from '../stores/sampleStore.js'

describe('useSampleAPI', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn())
    })

    it('updates samples when search is successful', async () => {
        const { samples, searchSamples, loading } = useSampleAPI()

        // Mock the API response
        const mockData = { results: [{ id: 1, name: 'kick.wav' }] }
        fetch.mockResolvedValue({
            json: () => Promise.resolve(mockData),
        })

        const promise = searchSamples('kick')
        expect(loading.value).toBe(true)

        await promise

        expect(samples.value).toEqual(mockData.results)
        expect(loading.value).toBe(false)
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('query=kick'))
    })
})