import { ErrorType } from '../../basics/error-type';
import { ErrorValueObject } from '../../other-object/error-value-object';
import { BaseReferenceObject, FunctionVariantType } from '../../reference-object/base-reference-object';
import { BaseValueObject } from '../../value-object/base-value-object';
import { BaseFunction } from '../base-function';

export class Multiply extends BaseFunction {
    override calculate(variant1: FunctionVariantType, variant2: FunctionVariantType) {
        if (variant1.isErrorObject() || variant2.isErrorObject()) {
            return ErrorValueObject.create(ErrorType.VALUE);
        }

        let result;

        if (this.checkArrayType(variant1) && this.checkArrayType(variant2)) {
            result = (variant1 as BaseReferenceObject)
                .toArrayValueObject()
                .multiply((variant2 as BaseReferenceObject).toArrayValueObject());
        } else if (this.checkArrayType(variant1)) {
            result = (variant1 as BaseReferenceObject).toArrayValueObject().multiply(variant2 as BaseValueObject);
        } else if (this.checkArrayType(variant2)) {
            result = (variant1 as BaseValueObject).multiply((variant2 as BaseReferenceObject).toArrayValueObject());
        } else {
            result = (variant1 as BaseValueObject).multiply(variant2 as BaseValueObject);
        }

        return result;
    }
}
