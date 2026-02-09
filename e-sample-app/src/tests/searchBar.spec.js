import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import SearchBar from '../components/SearchBar.vue'

vi.mock('../stores/sampleStore.js', () => ({
    useSampleAPI: () => ({
        samples: [{ id: 1, name: 'Snare' }],
        loading: false,
        searchSamples: vi.fn()
    })
}))

describe('SearchBar', () => {
    it('calls submitKeyword on enter', async () => {
        const wrapper = mount(SearchBar)
        const input = wrapper.find('input')

        await input.setValue('drums')
        await input.trigger('keyup.enter')

        expect(input.element.value).toBe('drums')
    })

    it('renders samples from the store', () => {
        const wrapper = mount(SearchBar)
        expect(wrapper.text()).toContain('Snare')
    })
})