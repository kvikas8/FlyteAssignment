import React from 'react'
import { Image, ImageProps } from 'react-native'
import { ImageNames } from './imageName'

export default class ImageFactory {
    public static createImage(key: ImageNames, props?: Partial<ImageProps>): JSX.Element {
        switch (key) {
            case ImageNames.TRANSFER_ICON:
                return <Image {...props} source={require('./../assets/images/transfer.png')} />
            case ImageNames.INVITE_ICON:
                return <Image {...props} source={require('./../assets/images/invite.png')} />
            case ImageNames.SAVE_ICON:
                return <Image {...props} source={require('./../assets/images/save.png')} />
            case ImageNames.SHARE_ICON:
                return <Image {...props} source={require('./../assets/images/share.png')} />
            case ImageNames.DELETE_ICON:
                return <Image {...props} source={require('./../assets/images/delete.png')} />

            default:
                throw new Error('no image found for key ' + key + ' in Ingenio image factory')
        }
    }
}
