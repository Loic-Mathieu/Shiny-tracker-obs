export default class StringUtils {
	public static isStreamEmpty(value: string): boolean {
		return (!value || value.trim().length === 0);
	}
}
