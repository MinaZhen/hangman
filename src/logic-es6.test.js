var expect = require("expect");
var Hangman = require("./logic-es6");

describe("Hangman", function() {

  describe("Create new game", () => {
    it("should succeed without paramenters", () => {
        var hangman = new Hangman()
        expect(hangman).toBeDefined()
        expect(hangman._word.length > 0).toBeTruthy()
        expect(hangman.attempts()).toEqual(10)
        expect(hangman._word.length).toEqual(hangman.guessed().length)
    });

    it("should succeed 2 times without paramenters, giving a random words", () => {
        var hangman = new Hangman()
        var hangman2 = new Hangman()        
        expect(hangman._word === hangman2._word).toBeFalsy()
    });

    it("should succeed with a word", function() {
        var hangman = new Hangman("HOLA")
        expect(hangman).toBeDefined()
        expect(hangman._word.length).toBe(4)
        expect(hangman.attempts()).toEqual(10)
        expect(hangman._word.length).toEqual(hangman.guessed().length)
    });

    it("should succeed with two words and 5 attempts", function() {
        var hangman = new Hangman("HolA MUNDO", 5)
        expect(hangman).toBeDefined()
        expect(hangman._word.length).toBe(10)
        expect(hangman.attempts()).toEqual(5)
        expect(hangman._word.length).toEqual(hangman.guessed().length)
    });

  });

  describe("In game", () => {
      var hangman

    beforeEach(() => {
        hangman = new Hangman("hOLa", 10)
    })

    it("should guess a letter", () => {
        hangman.try("h")
        expect(hangman.guessed().join("")).toBe("h___")
        expect(hangman.status()).toBe(0)
        expect(hangman.attempts()).toBe(10)
    });

    it("should fail a letter", () => {
        var letter = "x"
        hangman.try(letter)
        expect(hangman.guessed().join("")).toBe("____")
        expect(hangman.status()).toBe(0)
        expect(hangman.attempts()).toBe(9)
        expect(hangman._fails.length).toBe(1)
        expect(hangman._fails[0]).toEqual("X")
        expect(hangman._fails[0]).not.toEqual(letter)
    });

    it("should guess two letters normalized, fail two and win", () => {
        hangman.try("H")
        expect(hangman.guessed().join("")).toBe("h___")

        hangman.try("ó")
        expect(hangman.guessed().join("")).toBe("hO__")
        expect(hangman.status()).toBe(0)
        expect(hangman.attempts()).toBe(10)

        hangman.try("Î")
        expect(hangman.guessed().join("")).toBe("hO__")
        expect(hangman.status()).toBe(0)
        expect(hangman.attempts()).toBe(9)
        expect(hangman._fails.length).toBe(1)
        expect(hangman._fails[0]).toEqual("I")
        expect(hangman._fails[0]).not.toEqual("î")

        hangman.try("Ú")
        expect(hangman.guessed().join("")).toBe("hO__")
        expect(hangman.status()).toBe(0)
        expect(hangman.attempts()).toBe(8)
        expect(hangman._fails.length).toBe(2)
        expect(hangman._fails[1]).toEqual("U")

        hangman.try("hola")
        expect(hangman.status()).toBe(1)
        expect(hangman.attempts()).toBe(8)
        expect(hangman._fails.length).toBe(2)
        expect(hangman.guessed().join("")).toBe("hOLa")

    });

    it("should guess three letters normalized, fail one and lose", () => {
        hangman.try("H")
        hangman.try("ó")
        hangman.try("Â")
        hangman.try("x")
        expect(hangman.guessed().join("")).toBe("hO_a")
        expect(hangman.status()).toBe(0)
        expect(hangman.attempts()).toBe(9)
        expect(hangman._fails.length).toBe(1)
        expect(hangman._fails[0]).toEqual("X")
        expect(hangman._fails[0]).not.toEqual("x")

        hangman.try("hello")
        expect(hangman.status()).toBe(2)
        expect(hangman.attempts()).toBe(0)
        expect(hangman._fails.length).toBe(1)
        expect(hangman.guessed().join("")).toBe("hO_a")
    });

    it("should waste 10 attempts and lose", () => {
        for (var i = 0; i < 9 ; i++){ hangman.try("q") }
        expect(hangman.status()).toBe(0)
        expect(hangman.attempts()).toBe(1)
        
        hangman.try("q")
        expect(hangman.guessed().join("")).toBe("____")
        expect(hangman.status()).toBe(2)
        expect(hangman.attempts()).toBe(0)
        expect(hangman._fails.length).toBe(10)
        expect(hangman.hidden().join("")).toBe("hOLa")
        expect(hangman.hidden().length).toBe(4)
    });

    it("try should throw error if try parameter is empty string", () => {
        expect(() => hangman.try("")).toThrowError("text cannot empty or blank");
    })

    it("try should throw error if try parameter is empty", () => {
        expect(() => hangman.try()).toThrowError("invalid letter or word ");
    })

    it("try should throw error if try parameter is not a string", () => {
        expect(() => hangman.try(2)).toThrowError("invalid letter or word 2");
    })

    it("fails should work if parameter is a string and throw error if it isn't", () => {
        
        expect(hangman._fails.length === 0).toBeTruthy()

        hangman.fails("H")
        expect(hangman._fails.length === 1).toBeTruthy()
        expect(hangman._fails[0]).toEqual("H")
        expect(hangman._fails.join(" ")).toEqual(hangman.fails().trim())

        hangman.fails("HOLA")
        expect(hangman._fails.length === 2).toBeTruthy()
        expect(hangman._fails[1]).toEqual("HOLA")
        expect(hangman._fails.join(" ")).toEqual(hangman.fails().trim())

        expect(() => hangman.fails(2)).toThrowError("invalid input");
      })

      it("hidden should show word letters in array", () => {
        expect(hangman.hidden()).toBeUndefined()
        hangman._status = 2
        expect(hangman.hidden().join("")).toBe("hOLa")
        expect(hangman.hidden().length).toBe(4)
        hangman = null
        expect(() => hangman.hidden()).toThrow(TypeError);
      })
  });
});