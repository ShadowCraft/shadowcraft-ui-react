import Relic from "./Relic";

describe("Relic", () => {
  const relic = new Relic();

  it("should return type Relic", () => {
    expect(relic).toBeInstanceOf(Relic);
  });

  it("should handle null", () => {
    expect(new Relic(null)).toEqual(new Relic());
  });

  it("should handle undefined", () => {
    expect(new Relic(undefined)).toEqual(new Relic());
  });

  it("should handle id = undefined", () => {
    expect(new Relic({ id: undefined })).toEqual(new Relic());
  });

  it("should handle id = null", () => {
    expect(new Relic({ id: null })).toEqual(new Relic());
  });

  it("should handle id = undefined", () => {
    expect(new Relic({ ilvl: undefined })).toEqual(new Relic());
  });

  it("should handle id = null", () => {
    expect(new Relic({ ilvl: null })).toEqual(new Relic());
  });
});
