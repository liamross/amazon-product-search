/**
 * Omit specific properties from an interface. Use `"field1" | "field2"` to
 * exclude multiple. This is useful if you are adding a layer over a general
 * component and want to exclude specific props from being passed into the
 * layer.
 *
 * Usage:
 *
 * ```ts
 * interface SomeProps {
 *   field1: string;
 *   field2: string;
 *   field3: string;
 * }
 *
 * export interface OmittedProps extends Omit<SomeProps, 'field2' | 'field3'> {
 *   // Some other props if you wish or just leave empty
 * }
 *
 * export const fewer: FC<OmittedProps> = ({field1}) => {
 *   // Function contents
 * }
 * ```
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * Include specific properties from an interface. Use `"field1" | "field2"` to
 * include ultiple. This is useful if you are adding a layer over a general
 * component and want to include only specific props to pass into the layer.
 *
 * Usage:
 *
 * ```ts
 * interface SomeProps {
 *   field1: string;
 *   field2: string;
 *   field3: string;
 * }
 *
 * export interface IncludedProps extends Include<SomeProps, 'field2' | 'field3'> {
 *   // Some other props if you wish or just leave empty
 * }
 *
 * export const fewer: FC<IncludedProps> = ({field2, field3}) => {
 *   // Function contents
 * }
 * ```
 */
export type Include<T, K extends keyof T> = Pick<T, Extract<keyof T, K>>;
