import { Component } from 'react'
import { ImageProps } from 'react-native'
import ImageFactory from '../../config/imageFactory'
import { ImageNames } from '../../config/imageName'

interface Props extends Partial<ImageProps> {
    name: ImageNames
}

const defaultProps = {
    style: {},
}

export default class Image<P_ extends Props = Props> extends Component<P_> {
    public static defaultProps = defaultProps
    public name = 'Image'

    public render() {
        return ImageFactory.createImage(this.props.name, this.props)
    }
}
