import {Matrix, Rectangle, RenderTexture, Sprite, Point} from 'pixi.js';

import Bamboo from '../../Bamboo';
import DisplayObject from '../../component/DisplayObject';

export default class Camera extends DisplayObject {
    static componentName = 'Camera'
    static unique = false

	constructor(id, x, y, width, height, renderWidth, renderHeight) {
		super(id || 'Camera');
        let renderer = Bamboo.instance.renderer;

		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.renderWidth = renderWidth || renderer.width;
		this.renderHeight = renderHeight || renderer.height;

		this.boundingBox = new Rectangle(0, 0, 1, 1);

		this.renderTexture = new RenderTexture(renderer, this.renderWidth, this.renderHeight);
		this.renderSprite = new Sprite(this.renderTexture);
		this.renderSprite.width = width;
		this.renderSprite.height = height;

		this.targetPosition =  new Point(width * 0.5, height * 0.5);
		this.targetRotation = 0;
		this.targetZoom = 1;

		this.matrix = new Matrix();

		this.addChild(this.renderSprite);
	}

	update(dt) {
		this.matrix.identity();
		this.matrix.translate(-this.targetPosition.x, -this.targetPosition.y);

		this.matrix.scale(this.targetZoom, this.targetZoom);
		this.matrix.translate(this.width / 2, this.height / 2);

		this.updateBoundingBox();

		this.scene.prerender(this);
		this.renderTexture.render(this.scene.displayObject.displayObject, this.matrix, true);

		super.update(dt);
	}

	updateBoundingBox(){
        let topLeft = this.matrix.applyInverse(new Point(0, 0)),
            bottomRight = this.matrix.applyInverse(new Point(this.renderWidth, this.renderHeight));

        this.boundingBox.x = topLeft.x;
        this.boundingBox.y = topLeft.y;

        this.boundingBox.width = bottomRight.x - topLeft.x;
        this.boundingBox.height = bottomRight.y - topLeft.y;
	}

    get scene() {
        return this.gameObject.parent;
    }
}
