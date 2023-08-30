import { expect } from 'chai'

import PostService from '../../services/PostService'

describe('PostService', async function () {

    it('Should return some posts', async function () {
        const result = await PostService.getPostsAndCount('breckenridge', 'colorado')
        expect(result).to.be.an('array')
    })
})