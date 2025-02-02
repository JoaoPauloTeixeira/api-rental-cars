import { Output } from "../../2-business/dto/output";

export abstract class BaseController<I, O> {
    abstract run(input: I): Promise<Output<O>>
}