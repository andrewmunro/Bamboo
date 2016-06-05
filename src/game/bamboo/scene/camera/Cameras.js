import Camera from './Camera';
import Bamboo from '../../Bamboo';

export function fullscreen(width, height) {
    return [new Camera('fullscreen', 0, 0, width || Bamboo.instance.width, height || Bamboo.instance.height)];
}

export function fullscreenTwoPlayer(width, height) {
    return split(width || Bamboo.instance.width, height || Bamboo.instance.height, 1, 2);
}

export function fullscreenFourPlayer(width, height) {
    return split(width || Bamboo.instance.width, height || Bamboo.instance.height, 2, 2);
}

export function split(width, height, columns, rows) {
    let cameras = [];

    let cameraWidth = width / columns,
        cameraHeight = height / rows;

    for(var i = 0; i < columns; i++) {
        for(var j = 0; j < rows; j++) {
            cameras.push(new Camera(`Camera[${i},${j}]`, cameraWidth * i, cameraHeight * j, cameraWidth, cameraHeight));
        }
    }

    return cameras;
}
