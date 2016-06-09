import {Matrix, Rectangle, RenderTexture, Sprite} from 'pixi';

import Bamboo from '../../Bamboo';
import DisplayObject from '../../component/DisplayObject';
import Vector2 from '../../math/Vector2';

export default class Camera extends DisplayObject {
    static componentName = 'Camera'
    static unique = false

	constructor(id, x, y, width, height, renderWidth, renderHeight) {
		super(id || 'Camera');
        this.enabled = false;

        let renderer = Bamboo.instance.renderer;
		this.renderWidth = renderWidth || renderer.width;
		this.renderHeight = renderHeight || renderer.height;

		this.renderTexture = new RenderTexture(renderer, this.renderWidth, this.renderHeight);
		this.renderSprite = new Sprite(this.renderTexture);
        this.renderSprite.x = x;
        this.renderSprite.y = y;
		this.renderSprite.width = width;
		this.renderSprite.height = height;

		this.targetPosition = new Vector2(width * 0.5, height * 0.5);
		this.targetRotation = 0;
		this.targetZoom = 1;

		this.boundingBox = new Rectangle(0, 0, 1, 1);
		this.matrix = new Matrix();

		this.addChild(this.renderSprite);
	}

	update(dt) {
		this.matrix.identity();
		this.matrix.translate(-this.targetPosition.x, -this.targetPosition.y);

		this.matrix.scale(this.targetZoom, this.targetZoom);
		this.matrix.translate(this.renderSprite.width / 2, this.renderSprite.height / 2);

		this.updateBoundingBox();

		this.scene.prerender(this);
		this.renderTexture.render(this.scene.displayObject.displayObject, this.matrix, true);
	}

	updateBoundingBox(){
        let topLeft = this.matrix.applyInverse(new Vector2()),
            bottomRight = this.matrix.applyInverse(new Vector2(this.renderWidth, this.renderHeight));

        this.boundingBox.x = topLeft.x;
        this.boundingBox.y = topLeft.y;

        this.boundingBox.width = bottomRight.x - topLeft.x;
        this.boundingBox.height = bottomRight.y - topLeft.y;
	}

    get scene() {
        return this.gameObject.parent;
    }
}
