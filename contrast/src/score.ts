interface ScoreEntry {
  readonly valid: boolean,
  readonly actual: number,
  readonly required: number
}

interface ScoreSet {
  readonly regular: ScoreEntry,
  readonly large: ScoreEntry
}

interface WCAGScores {
  readonly a: ScoreSet,
  readonly aa: ScoreSet,
  readonly aaa: ScoreSet
}

function getScoreEntry(contrast:number, required:number):ScoreEntry {
  return {
    valid: contrast >= required,
    actual: contrast,
    required
  };
}

function getScoreSet(contrast:number, reqRegular:number, reqLarge:number):ScoreSet {
  return {
    regular: getScoreEntry(contrast, reqRegular),
    large: getScoreEntry(contrast, reqLarge),
  };
}

export function getWCAGScores(contrast:number):WCAGScores {
  return {
    a: getScoreSet(contrast, 1, 1),
    aa: getScoreSet(contrast, 4.5, 3),
    aaa: getScoreSet(contrast, 7, 4.5)
  };
}