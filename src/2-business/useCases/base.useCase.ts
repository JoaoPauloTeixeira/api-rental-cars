export abstract class BaseUseCase<I, O> {
    abstract run(input: I): Promise<O>
}