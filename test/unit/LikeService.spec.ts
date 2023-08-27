import sinon from 'sinon'
import {expect} from 'chai'

import LikeService from '../../services/LikeService'

describe('LikeService', async function(){
    let stubUnlikePost: sinon.SinonStub

    beforeEach(async function(){
        stubUnlikePost = sinon.stub(LikeService, 'unlikePost').resolves(0)
    })

    afterEach(async function(){
        sinon.restore()
    })

    it('Should unlike post', async function(){
        const result = await LikeService.unlikePost(10101, 1)

        expect(stubUnlikePost).to.have.been.calledWith(10101, 1)
    })
  
})