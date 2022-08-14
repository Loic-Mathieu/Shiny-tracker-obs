export default class StringUtils {
	public static isEmpty(value: string): boolean {
		const str = value === undefined || !value ? '' : value.trim();
		return str.length === 0;
	}
}
